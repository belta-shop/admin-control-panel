'use client';

import { Switch } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Offer } from '@/lib/types/api/offers';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import StatusChip from '@/view/components/status-chip';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Offer[];
  total: number;
}

export default function OfferListTable({ items, total }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteOffer } = useDialogActions();

  return (
    <CustomTable
      tableHead={tableHead}
      data={items.map((item) => ({ ...item, id: item._id }))}
      count={total}
      customRender={customRender}
      actions={[
        {
          label: 'Global.Action.edit',
          icon: <Iconify icon={Icons.PENCIL} />,
          onClick: (item) => router.push(paths.products.offers.edit(item.id)),
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Global.Action.delete',
          icon: <Iconify icon={Icons.TRASH} />,
          onClick: (item) => openDeleteOffer(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
      ]}
    />
  );
}

const tableHead = [
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'type', label: 'type' },
  { id: 'value', label: 'value' },
  { id: 'offerQuantity', label: 'offer_quantity' },
  { id: 'maxPerClient', label: 'max_per_client' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  type: (row: Offer) => (row.type === 'percent' ? 'Percent' : 'Fixed'),
  value: (row: Offer) => (row.type === 'percent' ? `${(row.value * 100).toFixed(1)}%` : row.value),
  disabled: (row: Offer) => <StatusChip value={!row.disabled} />,
  employeeReadOnly: (row: Offer) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
