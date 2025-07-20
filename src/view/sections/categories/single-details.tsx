'use client';

import { Switch } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import StatusChip from '@/view/components/status-chip';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import { Category, CategoryDetails } from '@/lib/types/api/categories';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function CategorySingleDetails({
  category,
}: {
  category: Category | CategoryDetails;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteCategory } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.name_ar',
      value: category.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: category.nameEn,
    },
    {
      label: 'Global.Label.status',
      value: <StatusChip value={!category.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
      value: (
        <Switch
          checked={category.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.categories.edit(category._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => openDeleteCategory(category._id),
      color: 'error',
    },
  ];

  const imageComponent = (
    <CustomImage
      src={category.cover}
      sx={{
        width: { xs: '100%', sm: '200px' },
        flexShrink: 0,
        height: 'auto',
        aspectRatio: 1,
      }}
    />
  );

  return (
    <DetailsCard
      fields={fields}
      actions={actions}
      showActions={!(user?.role === UserRole.EMPLOYEE && category.employeeReadOnly)}
    >
      {imageComponent}
    </DetailsCard>
  );
}
