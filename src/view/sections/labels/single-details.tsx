'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Box, Card, Stack, Switch, Button, Tooltip, Typography, CardContent } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Label } from '@/lib/types/api/labels';
import { useAuthStore } from '@/lib/store/auth';
import { deleteLabel } from '@/lib/actions/labels';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { LabelDetails } from '@/lib/types/api/labels';
import DeleteDialog from '@/view/components/dialog/delete-dialog';

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

  const textFields = [
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

  const actions = [
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

            {!(user?.role === UserRole.EMPLOYEE && label.employeeReadOnly) && renderActions}
          </Stack>
        </CardContent>
      </Card>

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
