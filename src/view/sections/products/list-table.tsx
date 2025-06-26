import { useState } from 'react';
import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Product } from '@/lib/types/api/products';
import { Iconify } from '@/view/components/iconify';
import { deleteProduct } from '@/lib/actions/product';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';
import ApiListItem from '@/view/components/api-related/api-list-item';

interface Props {
  items: Product[];
  total: number;
}

export default function ProductListTable({ items, total }: Props) {
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

      await deleteProduct(selectedDeleteId);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.product') }));

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
            onClick: (item) => router.push(paths.products.products.single(item.id)),
          },
          {
            label: 'Global.Action.edit',
            icon: <Iconify icon={Icons.PENCIL} />,
            onClick: (item) => router.push(paths.products.products.edit(item.id)),
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
        label={t('Label.product')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={isDeleting}
      />
    </>
  );
}

const tableHead = [
  { id: 'product', label: 'product' },
  { id: 'subcategory', label: 'sub_category' },
  { id: 'brand', label: 'brand' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  product: (row: Product) => (
    <ApiListItem cover={row.coverList[0]} nameAr={row.nameAr} nameEn={row.nameEn} />
  ),
  subcategory: ({ subcategory }: Product) =>
    subcategory ? (
      <ApiListItem
        cover={subcategory.cover}
        nameAr={subcategory.nameAr}
        nameEn={subcategory.nameEn}
        href={paths.products.subCategories.single(subcategory._id)}
      />
    ) : null,
  brand: ({ brand }: Product) =>
    brand ? <ApiListItem cover={brand.cover} nameAr={brand.nameAr} nameEn={brand.nameEn} /> : null,
  disabled: (row: Product) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: Product) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
