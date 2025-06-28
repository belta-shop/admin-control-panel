'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Card, Stack, Switch, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { SubCategory } from '@/lib/types/api/sub-categories';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import { SubCategoryDetails } from '@/lib/types/api/sub-categories';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import ApiListItem from '@/view/components/api-related/api-list-item';
import { deleteSubCategory, unlinkSubCategoryFromCategory } from '@/lib/actions/sub-category';

import SubCategoryLinkCategoryDialog from './link-category-dialog';

export default function SubCategorySingleDetails({
  subCategory,
}: {
  subCategory: SubCategory | SubCategoryDetails;
}) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const linkDialog = useBoolean(false);
  const unlinkDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const unlinking = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmUnlink = useCallback(async () => {
    try {
      unlinking.onTrue();

      await unlinkSubCategoryFromCategory(subCategory._id);

      enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.sub_category') }));
      unlinkDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
    }
  }, [subCategory._id, t, unlinkDialog, unlinking]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      deleting.onTrue();

      await deleteSubCategory(subCategory._id);
      enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.sub_category') }));
      router.push(paths.products.subCategories.list);

      deleteDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  }, [subCategory._id, t, router, deleteDialog, deleting]);

  const textFields = [
    {
      label: t('Global.Label.name_ar'),
      value: subCategory.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: subCategory.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: (
        <Switch
          checked={subCategory.disabled}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={subCategory.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
    ...(subCategory.category
      ? [
          {
            label: t('Global.Label.category'),
            value: (
              <ApiListItem
                cover={subCategory.category.cover}
                nameAr={subCategory.category.nameAr}
                nameEn={subCategory.category.nameEn}
                href={paths.products.categories.single(subCategory.category._id)}
              />
            ),
          },
        ]
      : []),
  ];

  const actions = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.subCategories.edit(subCategory._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => deleteDialog.onTrue(),
      color: 'error',
    },
    ...(!subCategory.category
      ? [
          {
            label: 'Pages.SubCategories.link_to_category',
            icon: Icons.LINK,
            onClick: () => linkDialog.onTrue(),
            color: 'info',
          },
        ]
      : [
          {
            label: 'Pages.SubCategories.unlink_from_category',
            icon: Icons.UNLINK,
            onClick: () => unlinkDialog.onTrue(),
            color: 'warning',
          },
        ]),
  ];

  const renderActions = (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={2}
      marginInlineStart={{ sm: 'auto' }}
      flexWrap="wrap"
    >
      {actions.map((action) => (
        <Tooltip key={action.label} title={t(action.label)}>
          <Button
            color={action.color as 'primary'}
            variant="outlined"
            onClick={action.onClick}
            sx={{ p: 1, minWidth: 0, borderRadius: 1000 }}
          >
            <Iconify icon={action.icon} fontSize={24} />
          </Button>
        </Tooltip>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="start" spacing={3}>
            <CustomImage
              src={subCategory.cover}
              sx={{
                width: { xs: '100%', sm: '200px' },
                flexShrink: 0,
                height: 'auto',
                aspectRatio: 1,
              }}
            />
            <Stack spacing={2}>
              {textFields.map((field) => (
                <Stack direction="row" spacing={1} key={field.label} alignItems="center">
                  <Typography variant="h6" component="span">
                    {field.label}:
                  </Typography>
                  <Typography variant="h6" color="text.secondary" component="span">
                    {field.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {!(user?.role === UserRole.EMPLOYEE && subCategory.employeeReadOnly) && renderActions}
          </Stack>
        </CardContent>
      </Card>

      <DeleteDialog
        label={t('Global.Label.sub_category')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />

      <SubCategoryLinkCategoryDialog
        open={linkDialog.value}
        onClose={linkDialog.onFalse}
        subCategoryId={subCategory._id}
      />

      <ConfirmDialog
        title={t('Global.Dialog.unlink_title', { label: t('Global.Label.sub_category') })}
        isOpen={unlinkDialog.value}
        onClose={unlinkDialog.onFalse}
        handleConfirm={handleConfirmUnlink}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Global.Action.unlink'),
        }}
      >
        {t('Global.Dialog.unlink_content', {
          label: t('Global.Label.sub_category').toLowerCase(),
          parent: t('Global.Label.category').toLowerCase(),
        })}
      </ConfirmDialog>
    </>
  );
}
