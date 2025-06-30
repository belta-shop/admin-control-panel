import { useDialogStore } from '@/lib/store/dialogs';

export const useDialogActions = () => {
  const { openLinkDialog, openUnlinkDialog, openDeleteDialog } = useDialogStore();

  const openLinkProductToBrand = (productId: string) => {
    openLinkDialog('link-product-to-brand', productId);
  };

  const openLinkProductToSubCategory = (productId: string) => {
    openLinkDialog('link-product-to-sub-category', productId);
  };

  const openLinkProductToLabel = (productId: string) => {
    openLinkDialog('link-product-to-label', productId);
  };

  const openLinkProductToTag = (productId: string) => {
    openLinkDialog('link-product-to-tag', productId);
  };

  const openLinkSubCategoryToCategory = (subCategoryId: string) => {
    openLinkDialog('link-sub-category-to-category', subCategoryId);
  };

  const openLinkBrandToProduct = (brandId: string) => {
    openLinkDialog('link-brand-to-product', brandId);
  };

  const openLinkLabelToProduct = (labelId: string) => {
    openLinkDialog('link-label-to-product', labelId);
  };

  const openLinkTagToProduct = (tagId: string) => {
    openLinkDialog('link-tag-to-product', tagId);
  };

  const openUnlinkProductFromBrand = (productId: string) => {
    openUnlinkDialog('unlink-product-from-brand', productId);
  };

  const openUnlinkProductFromSubCategory = (productId: string) => {
    openUnlinkDialog('unlink-product-from-sub-category', productId);
  };

  const openUnlinkProductFromLabel = (productId: string, labelId: string) => {
    openUnlinkDialog('unlink-product-from-label', productId, labelId);
  };

  const openUnlinkProductFromTag = (productId: string, tagId: string) => {
    openUnlinkDialog('unlink-product-from-tag', productId, tagId);
  };

  const openUnlinkSubCategoryFromCategory = (subCategoryId: string) => {
    openUnlinkDialog('unlink-sub-category-from-category', subCategoryId);
  };

  const openDeleteProduct = (productId: string) => {
    openDeleteDialog('delete-product', productId);
  };

  const openDeleteBrand = (brandId: string) => {
    openDeleteDialog('delete-brand', brandId);
  };

  const openDeleteCategory = (categoryId: string) => {
    openDeleteDialog('delete-category', categoryId);
  };

  const openDeleteSubCategory = (subCategoryId: string) => {
    openDeleteDialog('delete-sub-category', subCategoryId);
  };

  const openDeleteLabel = (labelId: string) => {
    openDeleteDialog('delete-label', labelId);
  };

  const openDeleteTag = (tagId: string) => {
    openDeleteDialog('delete-tag', tagId);
  };

  const openDeleteOffer = (offerId: string) => {
    openDeleteDialog('delete-offer', offerId);
  };

  return {
    // Link actions
    openLinkProductToBrand,
    openLinkProductToSubCategory,
    openLinkProductToLabel,
    openLinkProductToTag,
    openLinkSubCategoryToCategory,
    openLinkBrandToProduct,
    openLinkLabelToProduct,
    openLinkTagToProduct,

    // Unlink actions
    openUnlinkProductFromBrand,
    openUnlinkProductFromSubCategory,
    openUnlinkProductFromLabel,
    openUnlinkProductFromTag,
    openUnlinkSubCategoryFromCategory,

    // Delete actions
    openDeleteProduct,
    openDeleteBrand,
    openDeleteCategory,
    openDeleteSubCategory,
    openDeleteLabel,
    openDeleteTag,
    openDeleteOffer,
  };
};
