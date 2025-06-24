'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Card, Stack, Switch, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Iconify } from '@/view/components/iconify';
import { invalidatePath } from '@/lib/actions/server-utils';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import { Category, CategoryDetails } from '@/lib/types/api/categories';

export default function CategorySingleDetails({
  category,
}: {
  category: Category | CategoryDetails;
}) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);

      await axiosInstance.delete(endpoints.categories.delete(category._id));
      await invalidatePath(paths.products.categories.list);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.category') }));
      router.push(paths.products.categories.list);

      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const textFields = [
    {
      label: t('Global.Label.name_ar'),
      value: category.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: category.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: (
        <Switch checked={category.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
      ),
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={category.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.categories.edit(category._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => setIsDeleteDialogOpen(true),
      color: 'error',
    },
  ];

  const renderActions = (
    <Stack direction={{ xs: 'row', sm: 'column' }} spacing={2} marginInlineStart={{ sm: 'auto' }}>
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <CustomImage
              src={category.cover}
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

            {!(user?.role === UserRole.EMPLOYEE && category.employeeReadOnly) && renderActions}
          </Stack>
        </CardContent>
      </Card>
      <DeleteDialog
        label={t('Global.Label.category')}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        handleDelete={handleConfirmDelete}
        loading={isDeleting}
      />
    </>
  );
}
