'use client';

import { useRouter } from 'next/navigation';
import { Box, Switch, Tooltip } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Label } from '@/lib/types/api/labels';
import { useAuthStore } from '@/lib/store/auth';
import { LabelDetails } from '@/lib/types/api/labels';
import StatusChip from '@/view/components/status-chip';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function LabelSingleDetails({ label }: { label: Label | LabelDetails }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteLabel } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.color',
      value: (
        <Tooltip title={label.color}>
          <Box sx={{ width: 32, height: 32, borderRadius: 10, backgroundColor: label.color }} />
        </Tooltip>
      ),
    },
    {
      label: 'Global.Label.name_ar',
      value: label.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: label.nameEn,
    },
    {
      label: 'Global.Label.disabled',
      value: <StatusChip value={!label.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
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
      onClick: () => openDeleteLabel(label._id),
      color: 'error',
    },
  ];

  return (
    <DetailsCard
      fields={fields}
      actions={actions}
      showActions={!(user?.role === UserRole.EMPLOYEE && label.employeeReadOnly)}
    />
  );
}
