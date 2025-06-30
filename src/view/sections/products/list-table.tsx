import { isObject } from 'lodash';
import { Switch } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Product } from '@/lib/types/api/products';
import { Iconify } from '@/view/components/iconify';
import { BrandProduct } from '@/lib/types/api/brands';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';
import CustomTable from '@/view/components/custom-table/custom-table';
import ApiListItem from '@/view/components/api-related/api-list-item';

interface Props {
  items: Product[] | BrandProduct[];
  total: number;
  disablePagination?: boolean;
  showBrand?: boolean;
  showSubCategory?: boolean;
  tagId?: string;
  labelId?: string;
}

export default function ProductListTableSimplified({
  items,
  total,
  disablePagination,
  showBrand = true,
  showSubCategory = true,
  tagId,
  labelId,
}: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    openDeleteProduct,
    openLinkProductToBrand,
    openLinkProductToSubCategory,
    openUnlinkProductFromBrand,
    openUnlinkProductFromSubCategory,
    openUnlinkProductFromLabel,
    openUnlinkProductFromTag,
  } = useDialogActions();

  return (
    <CustomTable
      tableHead={getTableHead({ showBrand, showSubCategory })}
      data={items.map((item) => ({ ...item, id: item._id }))}
      count={total}
      disablePagination={disablePagination}
      customRender={customRender}
      actions={[
        {
          label: 'Global.Action.view',
          icon: <Iconify icon={Icons.EYE_FILLED} />,
          onClick: (item) => router.push(paths.products.products.single(item.id)),
        },
        {
          label: 'Global.Action.edit',
          icon: <Iconify icon={Icons.PENCIL} />,
          onClick: (item) => router.push(paths.products.products.edit(item.id)),
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Global.Action.delete',
          icon: <Iconify icon={Icons.TRASH} />,
          onClick: (item) => openDeleteProduct(item.id),
          sx: { color: 'error.main' },
          hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
        },
        {
          label: 'Pages.Products.unlink_from_tag',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => {
            if (tagId) {
              openUnlinkProductFromTag(item.id, tagId);
            }
          },
          sx: { color: 'warning.main' },
          hide: (item) => !tagId || !item.tags.includes(tagId),
        },
        {
          label: 'Pages.Products.unlink_from_label',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => {
            if (labelId) {
              openUnlinkProductFromLabel(item.id, labelId);
            }
          },
          sx: { color: 'warning.main' },
          hide: (item) => !labelId || !item.labels.includes(labelId),
        },
        {
          label: 'Pages.Products.link_to_sub_category',
          icon: <Iconify icon={Icons.LINK} />,
          onClick: (item) => openLinkProductToSubCategory(item.id),
          sx: { color: 'info.main' },
          hide: (item) =>
            !!item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
        },
        {
          label: 'Pages.Products.unlink_from_sub_category',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => openUnlinkProductFromSubCategory(item.id),
          sx: { color: 'warning.main' },
          hide: (item) =>
            !item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
        },
        {
          label: 'Pages.Products.link_to_brand',
          icon: <Iconify icon={Icons.LINK} />,
          onClick: (item) => openLinkProductToBrand(item.id),
          sx: { color: 'info.main' },
          hide: (item) =>
            !!item.brand || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
        },
        {
          label: 'Pages.Products.unlink_from_brand',
          icon: <Iconify icon={Icons.UNLINK} />,
          onClick: (item) => openUnlinkProductFromBrand(item.id),
          sx: { color: 'warning.main' },
          hide: (item) =>
            !item.brand || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
        },
      ]}
    />
  );
}

const getTableHead = ({
  showBrand,
  showSubCategory,
}: {
  showBrand: boolean;
  showSubCategory: boolean;
}) => {
  return [
    { id: 'product', label: 'product' },
    ...(showSubCategory ? [{ id: 'subcategory', label: 'sub_category' }] : []),
    ...(showBrand ? [{ id: 'brand', label: 'brand' }] : []),
    { id: 'disabled', label: 'disabled' },
    { id: 'employeeReadOnly', label: 'employee_read_only' },
  ];
};

const customRender = {
  product: (row: Product | BrandProduct) => (
    <ApiListItem cover={row.coverList[0]} nameAr={row.nameAr} nameEn={row.nameEn} />
  ),
  subcategory: ({ subcategory }: Product | BrandProduct) =>
    subcategory ? (
      <ApiListItem
        cover={subcategory.cover}
        nameAr={subcategory.nameAr}
        nameEn={subcategory.nameEn}
        href={paths.products.subCategories.single(subcategory._id)}
      />
    ) : null,
  brand: (row: Product | BrandProduct) =>
    isObject(row.brand) ? (
      <ApiListItem
        cover={row.brand.cover}
        nameAr={row.brand.nameAr}
        nameEn={row.brand.nameEn}
        href={paths.products.brands.single(row.brand._id)}
      />
    ) : null,
  disabled: (row: Product | BrandProduct) => (
    <Switch checked={row.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
  employeeReadOnly: (row: Product | BrandProduct) => (
    <Switch checked={row.employeeReadOnly} sx={{ '& input': { cursor: 'default !important' } }} />
  ),
};
