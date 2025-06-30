'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Product } from '@/lib/types/api/products';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkProductToBrand } from '@/lib/actions/product';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { ProductsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  brandId?: string;
}

export default function BrandLinkProductDialog({ open, onClose, brandId }: Props) {
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
      if (selectedProduct && brandId) {
        loading.onTrue();
        await linkProductToBrand({ brandId, productId: selectedProduct._id });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.product') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedProduct, brandId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedProduct || !brandId;

  return (
    <ConfirmDialog
      title={t('Pages.Brands.link_to_product')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <ProductsAutoComplete onChange={setSelectedProduct} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
