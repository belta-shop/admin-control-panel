'use client';

import { Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { deleteCategory } from '@/lib/actions/category';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import { Category, CategoryDetails } from '@/lib/types/api/categories';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function CategorySingleDetails({
  category,
}: {
  category: Category | CategoryDetails;
}) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const deleteDialog = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmDelete = async () => {
    try {
      deleting.onTrue();

      await deleteCategory(category._id);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.category') }));
      router.push(paths.products.categories.list);

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

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.categories.edit(category._id)),
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
      src={category.cover}
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
        showActions={!(user?.role === UserRole.EMPLOYEE && category.employeeReadOnly)}
      >
        {imageComponent}
      </DetailsCard>
      <DeleteDialog
        label={t('Global.Label.category')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />
    </>
  );
}
