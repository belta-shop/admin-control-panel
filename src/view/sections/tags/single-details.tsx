'use client';

import { Switch } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { TagDetails } from '@/lib/types/api/tags';
import StatusChip from '@/view/components/status-chip';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function TagSingleDetails({ tag }: { tag: Tag | TagDetails }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteTag } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.name_ar',
      value: tag.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: tag.nameEn,
    },
    {
      label: 'Global.Label.status',
      value: <StatusChip value={!tag.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
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
      onClick: () => openDeleteTag(tag._id),
      color: 'error',
    },
  ];

  return (
    <DetailsCard
      fields={fields}
      actions={actions}
      showActions={!(user?.role === UserRole.EMPLOYEE && tag.employeeReadOnly)}
    />
  );
}
