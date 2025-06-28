'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { SubCategory } from '@/lib/types/api/sub-categories';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { linkSubCategoryToCategory } from '@/lib/actions/sub-category';
import { SubCategoriesAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId?: string;
}

export default function CategoryLinkSubCategoryDialog({ open, onClose, categoryId }: Props) {
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
      if (selectedSubCategory && categoryId) {
        loading.onTrue();
        await linkSubCategoryToCategory({ subCategoryId: selectedSubCategory._id, categoryId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.sub_category') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedSubCategory, categoryId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedSubCategory || !categoryId;

  return (
    <ConfirmDialog
      title={t('Pages.Categories.link_to_sub_category')}
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
