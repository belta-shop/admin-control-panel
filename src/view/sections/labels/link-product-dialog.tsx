import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Product } from '@/lib/types/api/products';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkLabelToProduct } from '@/lib/actions/labels';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { ProductsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  labelId?: string;
}

export default function LabelLinkProductDialog({ open, onClose, labelId }: Props) {
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
      if (selectedProduct && labelId) {
        loading.onTrue();
        await linkLabelToProduct({
          labelId,
          productId: selectedProduct._id,
        });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.label') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedProduct, labelId, loading, enqueueSnackbar, t, handleClose]);

  const disabled = !selectedProduct || !labelId;

  return (
    <ConfirmDialog
      title={t('Pages.Labels.link_to_product')}
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
