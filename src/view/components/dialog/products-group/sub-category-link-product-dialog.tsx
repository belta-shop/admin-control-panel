import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Product } from '@/lib/types/api/products';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkProductToSubCategory } from '@/lib/actions/product';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { ProductsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  subCategoryId?: string;
}

export default function SubCategoryLinkProductDialog({ open, onClose, subCategoryId }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedProduct(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedProduct && subCategoryId) {
        loading.onTrue();
        await linkProductToSubCategory({
          subCategoryId,
          productId: selectedProduct._id,
        });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.sub_category') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedProduct, subCategoryId, loading, enqueueSnackbar, t, handleClose]);

  const disabled = !selectedProduct || !subCategoryId;

  return (
    <ConfirmDialog
      title={t('Pages.SubCategories.link_to_product')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={disabled}
    >
      <ProductsAutoComplete onChange={setSelectedProduct} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
