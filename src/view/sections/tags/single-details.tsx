'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Card, Stack, Switch, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { deleteTag } from '@/lib/actions/tags';
import { useAuthStore } from '@/lib/store/auth';
import { TagDetails } from '@/lib/types/api/tags';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import DeleteDialog from '@/view/components/dialog/delete-dialog';

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

  const textFields = [
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

  const actions = [
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

  const renderActions = (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={2}
      marginInlineStart={{ sm: 'auto' }}
      flexWrap="wrap"
    >
      {actions.map((action) => (
        <Tooltip key={action.label} title={t(action.label)}>
          <Button
            color={action.color as 'primary'}
            variant="outlined"
            onClick={action.onClick}
            sx={{ p: 1, minWidth: 0, borderRadius: 1000 }}
          >
            <Iconify icon={action.icon} fontSize={24} />
          </Button>
        </Tooltip>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="start" spacing={3}>
            <Stack spacing={2}>
              {textFields.map((field) => (
                <Stack direction="row" spacing={1} key={field.label} alignItems="center">
                  <Typography variant="h6" component="span">
                    {field.label}:
                  </Typography>
                  <Typography variant="h6" color="text.secondary" component="span">
                    {field.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {!(user?.role === UserRole.EMPLOYEE && tag.employeeReadOnly) && renderActions}
          </Stack>
        </CardContent>
      </Card>

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
