'use client';

import { Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { deleteBrand } from '@/lib/actions/brands';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { Brand, BrandDetails } from '@/lib/types/api/brands';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

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

  const fields: DetailsField[] = [
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

  const actions: DetailsAction[] = [
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

  const imageComponent = (
    <CustomImage
      src={brand.cover}
      sx={{
        width: { xs: '100%', sm: '200px' },
        flexShrink: 0,
        height: 'auto',
        aspectRatio: 1,
      }}
    />
  );

  return (
    <>
      <DetailsCard
        fields={fields}
        actions={actions}
        showActions={!(user?.role === UserRole.EMPLOYEE && brand.employeeReadOnly)}
      >
        {imageComponent}
      </DetailsCard>
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
