'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Box, Switch, Tooltip } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Label } from '@/lib/types/api/labels';
import { useAuthStore } from '@/lib/store/auth';
import { deleteLabel } from '@/lib/actions/labels';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { LabelDetails } from '@/lib/types/api/labels';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function LabelSingleDetails({ label }: { label: Label | LabelDetails }) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const deleteDialog = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmDelete = useCallback(async () => {
    try {
      deleting.onTrue();

      await deleteLabel(label._id);
      enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.label') }));
      router.push(paths.products.labels.list);

      deleteDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  }, [label._id, t, router, deleteDialog, deleting]);

  const fields: DetailsField[] = [
    {
      label: t('Global.Label.color'),
      value: (
        <Tooltip title={label.color}>
          <Box sx={{ width: 32, height: 32, borderRadius: 10, backgroundColor: label.color }} />
        </Tooltip>
      ),
    },
    {
      label: t('Global.Label.name_ar'),
      value: label.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: label.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: (
        <Switch checked={label.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
      ),
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={label.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.labels.edit(label._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => deleteDialog.onTrue(),
      color: 'error',
    },
  ];

  return (
    <>
      <DetailsCard
        fields={fields}
        actions={actions}
        showActions={!(user?.role === UserRole.EMPLOYEE && label.employeeReadOnly)}
      />

      <DeleteDialog
        label={t('Global.Label.label')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />
    </>
  );
}
