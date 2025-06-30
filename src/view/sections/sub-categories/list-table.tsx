'use client';

import { Switch } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Iconify } from '@/view/components/iconify';
import { SubCategory } from '@/lib/types/api/sub-categories';
import CustomImage from '@/view/components/image/custom-image';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';

interface Props {
  items: SubCategory[];
  total: number;
  disablePagination?: boolean;
}

export default function SubCategoryListTable({ items, total, disablePagination }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const {
    openDeleteSubCategory,
    openLinkSubCategoryToCategory,
    openUnlinkSubCategoryFromCategory,
  } = useDialogActions();

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
          onClick: (item) => router.push(paths.products.subCategories.single(item.id)),
        },
        {
          label: 'Global.Action.edit',
          icon: <Iconify icon={Icons.PENCIL} />,
          onClick: (item) => router.push(paths.products.subCategories.edit(item.id)),
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Global.Action.delete',
          icon: <Iconify icon={Icons.TRASH} />,
          onClick: (item) => openDeleteSubCategory(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Pages.SubCategories.link_to_category',
          icon: <Iconify icon={Icons.LINK} />,
          onClick: (item) => openLinkSubCategoryToCategory(item.id),
          sx: { color: 'info.main' },
          hide: (item) =>
            !!item.category || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
        },
        {
          label: 'Pages.SubCategories.unlink_from_category',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => openUnlinkSubCategoryFromCategory(item.id),
          sx: { color: 'warning.main' },
          hide: (item) =>
            !item.category || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
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
  cover: (row: SubCategory) => <CustomImage src={row.cover} />,
  disabled: (row: SubCategory) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: SubCategory) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
