import { useState } from 'react';
import { isObject } from 'lodash';
import { Switch } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from '@/lib/i18n/navigation';
import { Product } from '@/lib/types/api/products';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { BrandProduct } from '@/lib/types/api/brands';
import { unlinkTagFromProduct } from '@/lib/actions/tags';
import { unlinkLabelFromProduct } from '@/lib/actions/labels';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';
import ApiListItem from '@/view/components/api-related/api-list-item';
import {
  deleteProduct,
  unlinkProductFromBrand,
  unlinkProductFromSubCategory,
} from '@/lib/actions/product';

import ProductLinkBrandDialog from './link-brand-dialog';
import ProductLinkSubCategoryDialog from './link-sub-category-dialog';

interface Props {
  items: Product[] | BrandProduct[];
  total: number;
  disablePagination?: boolean;
  showBrand?: boolean;
  showSubCategory?: boolean;
  tagId?: string;
  labelId?: string;
}

export default function ProductListTable({
  items,
  total,
  disablePagination,
  showBrand = true,
  showSubCategory = true,
  tagId,
  labelId,
}: Props) {
  const t = useTranslations('Global');
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedLinkBrandId, setSelectedLinkBrandId] = useState<string | null>(null);
  const [selectedLinkSubCategoryId, setSelectedLinkSubCategoryId] = useState<string | null>(null);
  const [selectedUnlinkId, setSelectedUnlinkId] = useState<string | null>(null);
  const [unlinkType, setUnlinkType] = useState<'subCategory' | 'brand' | 'tag' | 'label' | null>(
    null
  );
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const deleting = useBoolean(false);
  const unlinking = useBoolean(false);

  const handleCloseDeleteDialog = () => {
    setSelectedDeleteId(null);
    deleting.onFalse();
  };

  const handleCloseUnlinkDialog = () => {
    setSelectedUnlinkId(null);
    unlinking.onFalse();
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      deleting.onTrue();

      await deleteProduct(selectedDeleteId);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.product') }));

      handleCloseDeleteDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  };

  const handleConfirmUnlink = async () => {
    if (!selectedUnlinkId || !unlinkType) return;

    try {
      unlinking.onTrue();

      switch (unlinkType) {
        case 'brand':
          await unlinkProductFromBrand(selectedUnlinkId);
          break;
        case 'tag':
          if (tagId) {
            await unlinkTagFromProduct({ productId: selectedUnlinkId, tagId });
          }
          break;
        case 'label':
          if (labelId) {
            await unlinkLabelFromProduct({ productId: selectedUnlinkId, labelId });
          }
          break;
        default:
          await unlinkProductFromSubCategory(selectedUnlinkId);
      }

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.product') }));
      handleCloseUnlinkDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
    }
  };

  return (
    <>
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
            onClick: (item) => setSelectedDeleteId(item.id),
            sx: { color: 'error.main' },
            hide: (item) => item.employeeReadOnly && user?.role === UserRole.EMPLOYEE,
          },
          {
            label: 'Pages.Products.unlink_from_tag',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => {
              setSelectedUnlinkId(item.id);
              setUnlinkType('tag');
            },
            sx: { color: 'warning.main' },
            hide: (item) => !tagId || !item.tags.includes(tagId),
          },
          {
            label: 'Pages.Products.unlink_from_label',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => {
              setSelectedUnlinkId(item.id);
              setUnlinkType('label');
            },
            sx: { color: 'warning.main' },
            hide: (item) => !labelId || !item.labels.includes(labelId),
          },
          {
            label: 'Pages.Products.link_to_sub_category',
            icon: <Iconify icon={Icons.LINK} />,
            onClick: (item) => {
              setSelectedLinkBrandId(item.id);
              setUnlinkType('subCategory');
            },
            sx: { color: 'info.main' },
            hide: (item) =>
              !!item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.Products.unlink_from_sub_category',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => {
              setSelectedUnlinkId(item.id);
              setUnlinkType('subCategory');
            },
            sx: { color: 'warning.main' },
            hide: (item) =>
              !item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.Products.link_to_brand',
            icon: <Iconify icon={Icons.LINK} />,
            onClick: (item) => setSelectedLinkBrandId(item.id),
            sx: { color: 'info.main' },
            hide: (item) =>
              !!item.brand || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.Products.unlink_from_brand',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => setSelectedUnlinkId(item.id),
            sx: { color: 'warning.main' },
            hide: (item) =>
              !item.brand || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
        ]}
      />

      <DeleteDialog
        label={t('Label.product')}
        isOpen={!!selectedDeleteId}
        onClose={handleCloseDeleteDialog}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />

      <ProductLinkBrandDialog
        open={!!selectedLinkBrandId}
        onClose={() => setSelectedLinkBrandId(null)}
        productId={selectedLinkBrandId || undefined}
      />
      <ProductLinkSubCategoryDialog
        open={!!selectedLinkSubCategoryId}
        onClose={() => setSelectedLinkSubCategoryId(null)}
        productId={selectedLinkSubCategoryId || undefined}
      />

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.product') })}
        isOpen={!!selectedUnlinkId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlink}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      >
        {t('Dialog.unlink_content', {
          label: t('Label.product').toLowerCase(),
          parent: t(getUnlinkLabel(unlinkType)).toLowerCase(),
        })}
      </ConfirmDialog>
    </>
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

const getUnlinkLabel = (unlinkType: 'brand' | 'tag' | 'label' | 'subCategory' | null) => {
  switch (unlinkType) {
    case 'brand':
      return 'Label.brand';
    case 'tag':
      return 'Label.tag';
    case 'label':
      return 'Label.label';
    default:
      return 'Label.sub_category';
  }
};
