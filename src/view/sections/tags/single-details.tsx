'use client';

import { useCallback } from 'react';
import { Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { deleteTag } from '@/lib/actions/tags';
import { useAuthStore } from '@/lib/store/auth';
import { TagDetails } from '@/lib/types/api/tags';
import { useBoolean } from '@/lib/hooks/use-boolean';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function TagSingleDetails({ tag }: { tag: Tag | TagDetails }) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const deleteDialog = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmDelete = useCallback(async () => {
    try {
      deleting.onTrue();

      await deleteTag(tag._id);
      enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.tag') }));
      router.push(paths.products.tags.list);

      deleteDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  }, [tag._id, t, router, deleteDialog, deleting]);

  const fields: DetailsField[] = [
    {
      label: t('Global.Label.name_ar'),
      value: tag.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: tag.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: <Switch checked={tag.disabled} sx={{ '& input': { cursor: 'default !important' } }} />,
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={tag.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.tags.edit(tag._id)),
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
        showActions={!(user?.role === UserRole.EMPLOYEE && tag.employeeReadOnly)}
      />

      <DeleteDialog
        label={t('Global.Label.tag')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />
    </>
  );
}
