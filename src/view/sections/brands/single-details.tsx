'use client';

import { Switch } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import StatusChip from '@/view/components/status-chip';
import { Brand, BrandDetails } from '@/lib/types/api/brands';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';

export default function BrandSingleDetails({ brand }: { brand: Brand | BrandDetails }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteBrand } = useDialogActions();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.name_ar',
      value: brand.nameAr,
    },
    {
      label: 'Global.Label.name_en',
      value: brand.nameEn,
    },
    {
      label: 'Global.Label.disabled',
      value: <StatusChip value={!brand.disabled} />,
    },
    {
      label: 'Global.Label.employee_read_only',
      value: (
        <Switch
          checked={brand.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.brands.edit(brand._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => openDeleteBrand(brand._id),
      color: 'error',
    },
  ];

  const imageComponent = (
    <CustomImage
      src={brand.cover}
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
      showActions={!(user?.role === UserRole.EMPLOYEE && brand.employeeReadOnly)}
    >
      {imageComponent}
    </DetailsCard>
  );
}
