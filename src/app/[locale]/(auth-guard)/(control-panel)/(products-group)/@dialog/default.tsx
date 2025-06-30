'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { enqueueSnackbar } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { deleteBrand } from '@/lib/actions/brands';
import { Iconify } from '@/view/components/iconify';
import { deleteCategory } from '@/lib/actions/category';
import { DialogType, useDialogStore } from '@/lib/store/dialogs';
import DeleteDialog from '@/view/components/dialog/delete-dialog';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { deleteTag, unlinkTagFromProduct } from '@/lib/actions/tags';
import { deleteLabel, unlinkLabelFromProduct } from '@/lib/actions/labels';
import { deleteSubCategory, unlinkSubCategoryFromCategory } from '@/lib/actions/sub-category';
import ProductLinkTagDialog from '@/view/components/dialog/products-group/product-link-tag-dialog';
import TagLinkProductDialog from '@/view/components/dialog/products-group/tag-link-product-dialog';
import ProductLinkBrandDialog from '@/view/components/dialog/products-group/product-link-brand-dialog';
import ProductLinkLabelDialog from '@/view/components/dialog/products-group/product-link-label-dialog';
import BrandLinkProductDialog from '@/view/components/dialog/products-group/brand-link-product-dialog';
import LabelLinkProductDialog from '@/view/components/dialog/products-group/label-link-product-dialog';
import ProductLinkSubCategoryDialog from '@/view/components/dialog/products-group/product-link-sub-category-dialog';
import SubCategoryLinkCategoryDialog from '@/view/components/dialog/products-group/sub-category-link-category-dialog';
import {
  deleteProduct,
  unlinkProductFromBrand,
  unlinkProductFromSubCategory,
} from '@/lib/actions/product';
import { deleteOffer } from '@/lib/actions/offers';

export default function Page() {
  const t = useTranslations();
  const { isOpen, dialogType, sourceId, targetId, isLoading, closeDialog, setLoading } =
    useDialogStore();

  const handleConfirmDelete = useCallback(async () => {
    if (!sourceId || !dialogType) return;

    try {
      setLoading(true);

      switch (dialogType) {
        case 'delete-product':
          await deleteProduct(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.product') }));
          break;
        case 'delete-brand':
          await deleteBrand(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.brand') }));
          break;
        case 'delete-category':
          await deleteCategory(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.category') }));
          break;
        case 'delete-sub-category':
          await deleteSubCategory(sourceId);
          enqueueSnackbar(
            t('Global.Message.delete_success', { name: t('Global.Label.sub_category') })
          );
          break;
        case 'delete-label':
          await deleteLabel(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.label') }));
          break;
        case 'delete-tag':
          await deleteTag(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.tag') }));
          break;
        case 'delete-offer':
          await deleteOffer(sourceId);
          enqueueSnackbar(t('Global.Message.delete_success', { name: t('Global.Label.offer') }));
          break;
      }

      closeDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [sourceId, dialogType, t, closeDialog, setLoading]);

  const handleConfirmUnlink = useCallback(async () => {
    if (!sourceId || !dialogType) return;

    try {
      setLoading(true);

      switch (dialogType) {
        case 'unlink-product-from-brand':
          await unlinkProductFromBrand(sourceId);
          enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.brand') }));
          break;
        case 'unlink-product-from-sub-category':
          await unlinkProductFromSubCategory(sourceId);
          enqueueSnackbar(
            t('Global.Message.unlink_success', { name: t('Global.Label.sub_category') })
          );
          break;
        case 'unlink-product-from-label':
          if (!targetId) return;
          await unlinkLabelFromProduct({ productId: sourceId, labelId: targetId });
          enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.label') }));
          break;
        case 'unlink-product-from-tag':
          if (!targetId) return;
          await unlinkTagFromProduct({ productId: sourceId, tagId: targetId });
          enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.tag') }));
          break;
        case 'unlink-sub-category-from-category':
          await unlinkSubCategoryFromCategory(sourceId);
          enqueueSnackbar(t('Global.Message.unlink_success', { name: t('Global.Label.category') }));
          break;
      }

      closeDialog();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [sourceId, targetId, dialogType, t, closeDialog, setLoading]);

  const getDeleteDialogLabel = (type: DialogType) => {
    switch (type) {
      case 'delete-product':
        return t('Global.Label.product');
      case 'delete-brand':
        return t('Global.Label.brand');
      case 'delete-category':
        return t('Global.Label.category');
      case 'delete-sub-category':
        return t('Global.Label.sub_category');
      case 'delete-label':
        return t('Global.Label.label');
      case 'delete-tag':
        return t('Global.Label.tag');
      case 'delete-offer':
        return t('Global.Label.offer');
      default:
        return '';
    }
  };

  const getUnlinkDialogTitle = (type: DialogType) => {
    switch (type) {
      case 'unlink-product-from-brand':
        return t('Global.Dialog.unlink_title', { label: t('Global.Label.brand') });
      case 'unlink-product-from-sub-category':
        return t('Global.Dialog.unlink_title', { label: t('Global.Label.sub_category') });
      case 'unlink-product-from-label':
        return t('Global.Dialog.unlink_title', { label: t('Global.Label.label') });
      case 'unlink-product-from-tag':
        return t('Global.Dialog.unlink_title', { label: t('Global.Label.tag') });
      case 'unlink-sub-category-from-category':
        return t('Global.Dialog.unlink_title', { label: t('Global.Label.category') });
      default:
        return '';
    }
  };

  const getUnlinkDialogContent = (type: DialogType) => {
    switch (type) {
      case 'unlink-product-from-brand':
        return t('Global.Dialog.unlink_content', {
          label: t('Global.Label.product').toLowerCase(),
          parent: t('Global.Label.brand').toLowerCase(),
        });
      case 'unlink-product-from-sub-category':
        return t('Global.Dialog.unlink_content', {
          label: t('Global.Label.product').toLowerCase(),
          parent: t('Global.Label.sub_category').toLowerCase(),
        });
      case 'unlink-product-from-label':
        return t('Global.Dialog.unlink_content', {
          label: t('Global.Label.product').toLowerCase(),
          parent: t('Global.Label.label').toLowerCase(),
        });
      case 'unlink-product-from-tag':
        return t('Global.Dialog.unlink_content', {
          label: t('Global.Label.product').toLowerCase(),
          parent: t('Global.Label.tag').toLowerCase(),
        });
      case 'unlink-sub-category-from-category':
        return t('Global.Dialog.unlink_content', {
          label: t('Global.Label.sub_category').toLowerCase(),
          parent: t('Global.Label.category').toLowerCase(),
        });
      default:
        return '';
    }
  };

  // Render delete dialog
  if (isOpen && dialogType?.startsWith('delete-')) {
    return (
      <DeleteDialog
        label={getDeleteDialogLabel(dialogType)}
        isOpen={isOpen}
        onClose={closeDialog}
        handleDelete={handleConfirmDelete}
        loading={isLoading}
      />
    );
  }

  // Render unlink dialog
  if (isOpen && dialogType?.startsWith('unlink-')) {
    return (
      <ConfirmDialog
        title={getUnlinkDialogTitle(dialogType)}
        isOpen={isOpen}
        onClose={closeDialog}
        handleConfirm={handleConfirmUnlink}
        loading={isLoading}
        actionProps={{
          color: 'warning',
          variant: 'contained',
          startIcon: <Iconify icon={Icons.UNLINK} />,
          children: t('Global.Action.unlink'),
        }}
      >
        {getUnlinkDialogContent(dialogType)}
      </ConfirmDialog>
    );
  }

  // Render link dialogs
  if (isOpen && dialogType?.startsWith('link-')) {
    switch (dialogType) {
      case 'link-product-to-brand':
        return (
          <ProductLinkBrandDialog
            open={isOpen}
            onClose={closeDialog}
            productId={sourceId || undefined}
          />
        );
      case 'link-product-to-sub-category':
        return (
          <ProductLinkSubCategoryDialog
            open={isOpen}
            onClose={closeDialog}
            productId={sourceId || undefined}
          />
        );
      case 'link-product-to-label':
        return (
          <ProductLinkLabelDialog
            open={isOpen}
            onClose={closeDialog}
            productId={sourceId || undefined}
          />
        );
      case 'link-product-to-tag':
        return (
          <ProductLinkTagDialog
            open={isOpen}
            onClose={closeDialog}
            productId={sourceId || undefined}
          />
        );
      case 'link-sub-category-to-category':
        return (
          <SubCategoryLinkCategoryDialog
            open={isOpen}
            onClose={closeDialog}
            subCategoryId={sourceId || undefined}
          />
        );
      case 'link-brand-to-product':
        return (
          <BrandLinkProductDialog
            open={isOpen}
            onClose={closeDialog}
            brandId={sourceId || undefined}
          />
        );
      case 'link-label-to-product':
        return (
          <LabelLinkProductDialog
            open={isOpen}
            onClose={closeDialog}
            labelId={sourceId || undefined}
          />
        );
      case 'link-tag-to-product':
        return (
          <TagLinkProductDialog open={isOpen} onClose={closeDialog} tagId={sourceId || undefined} />
        );
      default:
        return null;
    }
  }

  return null;
}
