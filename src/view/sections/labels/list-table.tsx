'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Switch, Tooltip } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Label } from '@/lib/types/api/labels';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';
import { deleteLabel, unlinkLabelFromProduct } from '@/lib/actions/labels';

interface Props {
  items: Label[];
  total: number;
  disablePagination?: boolean;
  productId?: string;
}

export default function LabelListTable({ items, total, disablePagination, productId }: Props) {
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

      await deleteLabel(selectedDeleteId);

      enqueueSnackbar(t('Message.delete_success', { name: t('Label.label') }));
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

      await unlinkLabelFromProduct({ productId, labelId: selectedUnlinkId });

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.label') }));
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
            onClick: (item) => router.push(paths.products.labels.single(item.id)),
          },
          {
            label: 'Global.Action.edit',
            icon: <Iconify icon={Icons.PENCIL} />,
            onClick: (item) => router.push(paths.products.labels.edit(item.id)),
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
            label: 'Pages.Labels.unlink_from_product',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => setSelectedUnlinkId(item.id),
            sx: { color: 'warning.main' },
            hide: (item) => !productId || !item.products.includes(productId),
          },
        ]}
      />

      <DeleteDialog
        label={t('Label.label')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.label') })}
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
          label: t('Label.label').toLowerCase(),
          parent: t('Label.product').toLowerCase(),
        })}
      </ConfirmDialog>
    </>
  );
}

const tableHead = [
  { id: 'color', label: 'color' },
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  color: (row: Label) => (
    <Tooltip title={row.color}>
      <Box sx={{ width: 32, height: 32, borderRadius: 10, backgroundColor: row.color }} />
    </Tooltip>
  ),
  disabled: (row: Label) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: Label) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
