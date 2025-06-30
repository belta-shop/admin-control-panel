'use client';

import { useCallback } from 'react';
import { Switch } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { UserRole } from '@/lib/types/auth';
import { useAuthStore } from '@/lib/store/auth';
import { Product } from '@/lib/types/api/products';
import { Iconify } from '@/view/components/iconify';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { ProductDetails } from '@/lib/types/api/products';
import CustomImage from '@/view/components/image/custom-image';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import ApiListItem from '@/view/components/api-related/api-list-item';
import DetailsCard, { DetailsField, DetailsAction } from '@/view/components/details-card';
import {
  deleteProduct,
  unlinkProductFromBrand,
  unlinkProductFromSubCategory,
} from '@/lib/actions/product';

import ProductLinkBrandDialog from './link-brand-dialog';
import ProductLinkSubCategoryDialog from './link-sub-category-dialog';

export default function ProductSingleDetails({ product }: { product: Product | ProductDetails }) {
  const t = useTranslations();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const linkSubCategoryDialog = useBoolean(false);
  const unlinkSubCategoryDialog = useBoolean(false);
  const linkBrandDialog = useBoolean(false);
  const unlinkBrandDialog = useBoolean(false);
  const deleteDialog = useBoolean(false);
  const unlinking = useBoolean(false);
  const deleting = useBoolean(false);

  const handleConfirmUnlinkSubCategory = useCallback(async () => {
    try {
      unlinking.onTrue();

      await unlinkProductFromSubCategory(product._id);

      enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.sub_category') }));
      unlinkSubCategoryDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
    }
  }, [product._id, t, unlinkSubCategoryDialog, unlinking]);

  const handleConfirmUnlinkBrand = useCallback(async () => {
    try {
      unlinking.onTrue();

      await unlinkProductFromBrand(product._id);

      enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.brand') }));
      unlinkBrandDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      unlinking.onFalse();
    }
  }, [product._id, t, unlinkBrandDialog, unlinking]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      deleting.onTrue();

      await deleteProduct(product._id);
      enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.product') }));
      router.push(paths.products.products.list);

      deleteDialog.onFalse();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      deleting.onFalse();
    }
  }, [deleting, product._id, t, router, deleteDialog]);

  const fields: DetailsField[] = [
    {
      label: t('Global.Label.name_ar'),
      value: product.nameAr,
    },
    {
      label: t('Global.Label.name_en'),
      value: product.nameEn,
    },
    {
      label: t('Global.Label.disabled'),
      value: (
        <Switch checked={product.disabled} sx={{ '& input': { cursor: 'default !important' } }} />
      ),
    },
    {
      label: t('Global.Label.employee_read_only'),
      value: (
        <Switch
          checked={product.employeeReadOnly}
          sx={{ '& input': { cursor: 'default !important' } }}
        />
      ),
    },
    ...(product.subcategory
      ? [
          {
            label: t('Global.Label.sub_category'),
            value: (
              <ApiListItem
                cover={product.subcategory.cover}
                nameAr={product.subcategory.nameAr}
                nameEn={product.subcategory.nameEn}
                href={paths.products.subCategories.single(product.subcategory._id)}
              />
            ),
          },
        ]
      : []),
    ...(product.brand
      ? [
          {
            label: t('Global.Label.brand'),
            value: (
              <ApiListItem
                cover={product.brand.cover}
                nameAr={product.brand.nameAr}
                nameEn={product.brand.nameEn}
                href={paths.products.brands.single(product.brand._id)}
              />
            ),
          },
        ]
      : []),
  ];

  const actions: DetailsAction[] = [
    {
      label: 'Global.Action.edit',
      icon: Icons.PENCIL,
      onClick: () => router.push(paths.products.products.edit(product._id)),
    },
    {
      label: 'Global.Action.delete',
      icon: Icons.TRASH,
      onClick: () => deleteDialog.onTrue(),
      color: 'error',
    },
    ...(!product.subcategory
      ? [
          {
            label: 'Pages.Products.link_to_sub_category',
            icon: Icons.LINK,
            onClick: () => linkSubCategoryDialog.onTrue(),
            color: 'info' as const,
          },
        ]
      : [
          {
            label: 'Pages.Products.unlink_from_sub_category',
            icon: Icons.UNLINK,
            onClick: () => unlinkSubCategoryDialog.onTrue(),
            color: 'warning' as const,
          },
        ]),
    ...(!product.brand
      ? [
          {
            label: 'Pages.Products.link_to_brand',
            icon: Icons.LINK,
            onClick: () => linkBrandDialog.onTrue(),
            color: 'info' as const,
          },
        ]
      : [
          {
            label: 'Pages.Products.unlink_from_brand',
            icon: Icons.UNLINK,
            onClick: () => unlinkBrandDialog.onTrue(),
            color: 'warning' as const,
          },
        ]),
  ];

  const imageComponent = (
    <CustomImage
      src={product.coverList[0]}
      sx={{
        width: { xs: '100%', sm: '200px' },
        flexShrink: 0,
        height: 'auto',
        aspectRatio: 1,
      }}
    />
  );

  return (
    <>
      <DetailsCard
        fields={fields}
        actions={actions}
        showActions={!(user?.role === UserRole.EMPLOYEE && product.employeeReadOnly)}
      >
        {imageComponent}
      </DetailsCard>

      <DeleteDialog
        label={t('Global.Label.sub_category')}
        isOpen={deleteDialog.value}
        onClose={deleteDialog.onFalse}
        handleDelete={handleConfirmDelete}
        loading={deleting.value}
      />

      <ProductLinkSubCategoryDialog
        open={linkSubCategoryDialog.value}
        onClose={linkSubCategoryDialog.onFalse}
        productId={product._id}
      />
      <ProductLinkBrandDialog
        open={linkBrandDialog.value}
        onClose={linkBrandDialog.onFalse}
        productId={product._id}
      />

      <ConfirmDialog
        title={t('Global.Dialog.unlink_title', { label: t('Global.Label.sub_category') })}
        isOpen={unlinkSubCategoryDialog.value}
        onClose={unlinkSubCategoryDialog.onFalse}
        handleConfirm={handleConfirmUnlinkSubCategory}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Global.Action.unlink'),
        }}
      >
        {t('Global.Dialog.unlink_content', {
          label: t('Global.Label.sub_category').toLowerCase(),
          parent: t('Global.Label.category').toLowerCase(),
        })}
      </ConfirmDialog>

      <ConfirmDialog
        title={t('Global.Dialog.unlink_title', { label: t('Global.Label.brand') })}
        isOpen={unlinkBrandDialog.value}
        onClose={unlinkBrandDialog.onFalse}
        handleConfirm={handleConfirmUnlinkBrand}
        loading={unlinking.value}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Global.Action.unlink'),
        }}
      >
        {t('Global.Dialog.unlink_content', {
          label: t('Global.Label.brand').toLowerCase(),
          parent: t('Global.Label.category').toLowerCase(),
        })}
      </ConfirmDialog>
    </>
  );
}
