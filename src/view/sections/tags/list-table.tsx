'use client';

import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { deleteTag } from '@/lib/actions/tags';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Tag[];
  total: number;
  disablePagination?: boolean;
}

export default function TagListTable({ items, total, disablePagination }: Props) {
  const t = useTranslations('Global');
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const deleting = useBoolean(false);

  const handleCloseDeleteDialog = useCallback(() => {
    setSelectedDeleteId(null);
    deleting.onFalse();
  }, [deleting, setSelectedDeleteId]);

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      deleting.onTrue();

      await deleteTag(selectedDeleteId);

      enqueueSnackbar(t('Message.delete_success', { name: t('Label.tag') }));
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
      handleCloseDeleteDialog();
    }
  };

  return (
    <>
      <CustomTable
        tableHead={tableHead}
        data={items.map((item) => ({ ...item, id: item._id }))}
        count={total}
        disablePagination={disablePagination}
        customRender={customRender}
        actions={[
          {
            label: 'Global.Action.view',
            icon: <Iconify icon={Icons.EYE_FILLED} />,
            onClick: (item) => router.push(paths.products.tags.single(item.id)),
          },
          {
            label: 'Global.Action.edit',
            icon: <Iconify icon={Icons.PENCIL} />,
            onClick: (item) => router.push(paths.products.tags.edit(item.id)),
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
        label={t('Label.tag')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />
    </>
  );
}

const tableHead = [
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  disabled: (row: Tag) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: Tag) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
