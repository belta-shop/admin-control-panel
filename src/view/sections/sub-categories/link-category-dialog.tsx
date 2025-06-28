import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { Category } from '@/lib/types/api/categories';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { linkSubCategoryToCategory } from '@/lib/actions/sub-category';
import { CategoriesAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  subCategoryId?: string;
}

export default function SubCategoryLinkCategoryDialog({ open, onClose, subCategoryId }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedCategory(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedCategory && subCategoryId) {
        loading.onTrue();
        await linkSubCategoryToCategory({
          subCategoryId,
          categoryId: selectedCategory._id,
        });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.sub_category') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedCategory, subCategoryId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedCategory || !subCategoryId;

  return (
    <ConfirmDialog
      title={t('Pages.SubCategories.link_to_category')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <CategoriesAutoComplete onChange={setSelectedCategory} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
