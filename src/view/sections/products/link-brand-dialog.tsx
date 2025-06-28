'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Brand } from '@/lib/types/api/brands';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkProductToBrand } from '@/lib/actions/product';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { BrandsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkBrandDialog({ open, onClose, productId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedBrand(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedBrand && productId) {
        loading.onTrue();
        await linkProductToBrand({ brandId: selectedBrand._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.product') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedBrand, productId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedBrand || !productId;

  return (
    <ConfirmDialog
      title={t('Pages.Products.link_to_brand')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <BrandsAutoComplete onChange={setSelectedBrand} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
