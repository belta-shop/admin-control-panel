import { Switch } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { Category } from '@/lib/types/api/categories';
import StatusChip from '@/view/components/status-chip';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: Category[];
  total: number;
}

export default function CategoryListTable({ items, total }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { openDeleteCategory } = useDialogActions();

  return (
    <CustomTable
      tableHead={tableHead}
      data={items.map((item) => ({ ...item, id: item._id }))}
      count={total}
      customRender={customRender}
      actions={[
        {
          label: 'Global.Action.view',
          icon: <Iconify icon={Icons.EYE_FILLED} />,
          onClick: (item) => router.push(paths.products.categories.single(item.id)),
        },
        {
          label: 'Global.Action.edit',
          icon: <Iconify icon={Icons.PENCIL} />,
          onClick: (item) => router.push(paths.products.categories.edit(item.id)),
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Global.Action.delete',
          icon: <Iconify icon={Icons.TRASH} />,
          onClick: (item) => openDeleteCategory(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
      ]}
    />
  );
}

const tableHead = [
  { id: 'cover', label: 'cover' },
  { id: 'nameAr', label: 'name_ar' },
  { id: 'nameEn', label: 'name_en' },
  { id: 'disabled', label: 'disabled' },
  { id: 'employeeReadOnly', label: 'employee_read_only' },
];

const customRender = {
  cover: (row: Category) => <CustomImage src={row.cover} />,
  disabled: (row: Category) => <StatusChip value={!row.disabled} />,
  employeeReadOnly: (row: Category) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
