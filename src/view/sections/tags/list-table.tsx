'use client';

import { Switch } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { Tag } from '@/lib/types/api/tags';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import StatusChip from '@/view/components/status-chip';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Tag[];
  total: number;
  disablePagination?: boolean;
  productId?: string;
}

export default function TagListTable({ items, total, disablePagination, productId }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteTag, openUnlinkProductFromTag } = useDialogActions();

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
          onClick: (item) => router.push(paths.products.tags.single(item.id)),
        },
        {
          label: 'Global.Action.edit',
          icon: <Iconify icon={Icons.PENCIL} />,
          onClick: (item) => router.push(paths.products.tags.edit(item.id)),
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Global.Action.delete',
          icon: <Iconify icon={Icons.TRASH} />,
          onClick: (item) => openDeleteTag(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Pages.Tags.unlink_from_product',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => {
            if (productId) {
              openUnlinkProductFromTag(productId, item.id);
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
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  disabled: (row: Tag) => <StatusChip value={!row.disabled} />,
  employeeReadOnly: (row: Tag) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
