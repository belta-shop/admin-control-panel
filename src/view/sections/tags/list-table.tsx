'use client';

import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { deleteTag, unlinkTagFromProduct } from '@/lib/actions/tags';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Tag[];
  total: number;
  disablePagination?: boolean;
  productId?: string;
}

export default function TagListTable({ items, total, disablePagination, productId }: Props) {
  const t = useTranslations('Global');
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [selectedUnlinkId, setSelectedUnlinkId] = useState<string | null>(null);
  const deleting = useBoolean(false);
  const unlinking = useBoolean(false);

  const handleCloseDeleteDialog = useCallback(() => {
    setSelectedDeleteId(null);
    deleting.onFalse();
  }, [deleting, setSelectedDeleteId]);

  const handleCloseUnlinkDialog = useCallback(() => {
    setSelectedUnlinkId(null);
    unlinking.onFalse();
  }, [unlinking, setSelectedUnlinkId]);

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

  const handleConfirmUnlink = async () => {
    if (!selectedUnlinkId || !productId) return;

    try {
      unlinking.onTrue();

      await unlinkTagFromProduct({ productId, tagId: selectedUnlinkId });

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.tag') }));
      handleCloseUnlinkDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
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
          {
            label: 'Pages.Tags.unlink_from_product',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => setSelectedUnlinkId(item.id),
            sx: { color: 'warning.main' },
            hide: (item) => !productId || !item.products.includes(productId),
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

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.tag') })}
        isOpen={!!selectedUnlinkId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlink}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      >
        {t('Dialog.unlink_content', {
          label: t('Label.tag').toLowerCase(),
          parent: t('Label.product').toLowerCase(),
        })}
      </ConfirmDialog>
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
