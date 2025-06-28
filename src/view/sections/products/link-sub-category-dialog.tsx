'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { SubCategory } from '@/lib/types/api/sub-categories';
import { linkProductToSubCategory } from '@/lib/actions/product';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { SubCategoriesAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkSubCategoryDialog({ open, onClose, productId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedSubCategory(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedSubCategory && productId) {
        loading.onTrue();
        await linkProductToSubCategory({ subCategoryId: selectedSubCategory._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.product') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedSubCategory, productId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedSubCategory || !productId;

  return (
    <ConfirmDialog
      title={t('Pages.Products.link_to_brand')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <SubCategoriesAutoComplete onChange={setSelectedSubCategory} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
