'use client';

import { Box, Switch, Tooltip } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { Label } from '@/lib/types/api/labels';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Label[];
  total: number;
  disablePagination?: boolean;
  productId?: string;
}

export default function LabelListTable({ items, total, disablePagination, productId }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteLabel, openUnlinkProductFromLabel } = useDialogActions();

  return (
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
          onClick: (item) => openDeleteLabel(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Pages.Labels.unlink_from_product',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => {
            if (productId) {
              openUnlinkProductFromLabel(productId, item.id);
            }
          },
          sx: { color: 'warning.main' },
          hide: (item) => !productId || !item.products.includes(productId),
        },
      ]}
    />
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
