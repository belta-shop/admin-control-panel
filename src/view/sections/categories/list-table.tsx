import { useState } from 'react';
import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { Category } from '@/lib/types/api/categories';
import { deleteCategory } from '@/lib/actions/category';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Category[];
  total: number;
}

export default function CategoryListTable({ items, total }: Props) {
  const t = useTranslations('Global');
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseDeleteDialog = () => {
    setSelectedDeleteId(null);
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setIsDeleting(true);

      await deleteCategory(selectedDeleteId);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.category') }));

      handleCloseDeleteDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        data={items.map((item) => ({ ...item, id: item._id }))}
        count={total}
        customRender={customRender}
        actions={[
          {
            label: 'Global.Action.view',
            icon: <Iconify icon={Icons.EYE_FILLED} />,
            onClick: (item) => router.push(paths.products.categories.single(item.id)),
          },
          {
            label: 'Global.Action.edit',
            icon: <Iconify icon={Icons.PENCIL} />,
            onClick: (item) => router.push(paths.products.categories.edit(item.id)),
            hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
          },
          {
            label: 'Global.Action.delete',
            icon: <Iconify icon={Icons.TRASH} />,
            onClick: (item) => setSelectedDeleteId(item.id),
            sx: { color: 'error.main' },
            hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
          },
        ]}
      />

      <DeleteDialog
        label={t('Label.category')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={isDeleting}
      />
    </>
  );
}

const tableHead = [
  { id: 'cover', label: 'cover' },
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  cover: (row: Category) => <CustomImage src={row.cover} />,
  disabled: (row: Category) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: Category) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
