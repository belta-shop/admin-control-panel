'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Card, Stack, Switch, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { deleteBrand } from '@/lib/actions/brands';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { Brand, BrandDetails } from '@/lib/types/api/brands';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';

export default function BrandSingleDetails({ brand }: { brand: Brand | BrandDetails }) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const deleteDialog = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmDelete = async () => {
    try {
      deleting.onTrue();

      await deleteBrand(brand._id);
      enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.brand') }));
      router.push(paths.products.brands.list);

      deleteDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  };

  const textFields = [
    {
      label: t('Global.Label.name_ar'),
      value: brand.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: brand.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: (
        <Switch checked={brand.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
      ),
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={brand.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.brands.edit(brand._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: deleteDialog.onTrue,
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
              src={brand.cover}
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

            {!(user?.role === UserRole.EMPLOYEE && brand.employeeReadOnly) && renderActions}
          </Stack>
        </CardContent>
      </Card>
      <DeleteDialog
        label={t('Global.Label.brand')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />
    </>
  );
}
