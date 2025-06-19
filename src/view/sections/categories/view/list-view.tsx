'use client';

import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { Card, Switch } from '@mui/material';

import { paths } from '@/lib/config/paths';
import { Icons } from '@/lib/config/icons';
import { useRouter } from '@/lib/i18n/navigation';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Iconify } from '@/view/components/iconify';
import { Category } from '@/lib/types/api/categories';
import { invalidatePath } from '@/lib/actions/server-utils';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Category[];
  total: number;
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

export default function ListView({ items, total }: Props) {
  const t = useTranslations('Global');
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

      await axiosInstance.delete(endpoints.categories.delete(selectedDeleteId));
      await invalidatePath(paths.products.categories.list);

      enqueueSnackbar(t('Message.delete_success', { name: t('Label.category') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  return (
    <>
      <Card>
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
            },
            {
              label: 'Global.Action.delete',
              icon: <Iconify icon={Icons.TRASH} />,
              onClick: (item) => setSelectedDeleteId(item.id),
              sx: { color: 'error.main' },
            },
          ]}
        />
      </Card>

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
