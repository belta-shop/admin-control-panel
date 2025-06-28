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
import { BrandProduct } from '@/lib/types/api/brands';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import CustomTable from '@/view/components/custom-table/custom-table';
import ApiListItem from '@/view/components/api-related/api-list-item';
import {
  deleteProduct,
  unlinkProductFromBrand,
  unlinkProductFromSubCategory,
} from '@/lib/actions/product';

import ProductLinkBrandDialog from './link-product-dialog';
import ProductLinkSubCategoryDialog from './link-product-sub-dialog';

interface Props {
  items: Product[] | BrandProduct[];
  total: number;
  disablePagination?: boolean;
  showBrand?: boolean;
  showSubCategory?: boolean;
}

export default function ProductListTable({
  items,
  total,
  disablePagination,
  showBrand = true,
  showSubCategory = true,
}: Props) {
  const t = useTranslations('Global');
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [selectedUnlinkId, setSelectedUnlinkId] = useState<string | null>(null);
  const [selectedLinkSubId, setSelectedLinkSubId] = useState<string | null>(null);
  const [selectedUnlinkSubId, setSelectedUnlinkSubId] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseDeleteDialog = () => {
    setSelectedDeleteId(null);
    setIsDeleting(false);
  };

  const handleCloseUnlinkDialog = () => {
    setSelectedUnlinkId(null);
    setSelectedUnlinkSubId(null);
    setIsUnlinking(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setIsDeleting(true);

      await deleteProduct(selectedDeleteId);
      enqueueSnackbar(t('Message.delete_success', { name: t('Label.product') }));

      handleCloseDeleteDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmUnlinkSub = async () => {
    if (!selectedUnlinkSubId) return;

    try {
      setIsUnlinking(true);

      await unlinkProductFromSubCategory(selectedUnlinkSubId);

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.product') }));
      handleCloseUnlinkDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsUnlinking(false);
    }
  };

  const handleConfirmUnlink = async () => {
    if (!selectedUnlinkId) return;

    try {
      setIsUnlinking(true);

      await unlinkProductFromBrand(selectedUnlinkId);

      enqueueSnackbar(t('Message.unlink_success', { name: t('Label.product') }));
      handleCloseUnlinkDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsUnlinking(false);
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
            label: 'Pages.Products.link_to_sub_category',
            icon: <Iconify icon={Icons.LINK} />,
            onClick: (item) => setSelectedLinkSubId(item.id),
            sx: { color: 'info.main' },
            hide: (item) =>
              !!item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.Products.unlink_from_sub_category',
            icon: <Iconify icon={Icons.UNLINK} />,
            onClick: (item) => setSelectedUnlinkSubId(item.id),
            sx: { color: 'warning.main' },
            hide: (item) =>
              !item.subcategory || (item.employeeReadOnly && user?.role === UserRole.EMPLOYEE),
          },
          {
            label: 'Pages.Products.link_to_brand',
            icon: <Iconify icon={Icons.LINK} />,
            onClick: (item) => setSelectedLinkId(item.id),
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
        loading={isDeleting}
      />

      <ProductLinkBrandDialog
        open={!!selectedLinkId}
        onClose={() => setSelectedLinkId(null)}
        productId={selectedLinkId || undefined}
      />
      <ProductLinkSubCategoryDialog
        open={!!selectedLinkSubId}
        onClose={() => setSelectedLinkSubId(null)}
        productId={selectedLinkSubId || undefined}
      />

      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.product') })}
        content={t('Dialog.unlink_content', { label: t('Label.product').toLowerCase() })}
        isOpen={!!selectedUnlinkSubId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlinkSub}
        loading={isUnlinking}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      />
      <ConfirmDialog
        title={t('Dialog.unlink_title', { label: t('Label.product') })}
        content={t('Dialog.unlink_content', { label: t('Label.product').toLowerCase() })}
        isOpen={!!selectedUnlinkId}
        onClose={handleCloseUnlinkDialog}
        handleConfirm={handleConfirmUnlink}
        loading={isUnlinking}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Action.unlink'),
        }}
      />
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
