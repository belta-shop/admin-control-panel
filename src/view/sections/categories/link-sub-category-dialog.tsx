'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { paths } from '@/lib/config/paths';
import { invalidatePath } from '@/lib/actions/server-utils';
import { SubCategory } from '@/lib/types/api/sub-categories';
import { linkSubCategoryToCategory } from '@/lib/actions/sub-category';

import SearchSubCategoryInput from './search-sub-category-input';

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId?: string;
}

export default function CategoryLinkSubCategoryDialog({ open, onClose, categoryId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClose = useCallback(() => {
    setSelectedSubCategory(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedSubCategory && categoryId) {
        setConfirmLoading(true);
        await linkSubCategoryToCategory({ subCategoryId: selectedSubCategory._id, categoryId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.sub_category') }));
        await invalidatePath(paths.products.categories.single(categoryId));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setConfirmLoading(false);
    }
  }, [selectedSubCategory, categoryId, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedSubCategory || !categoryId;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Pages.Categories.link_sub_category')}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <SearchSubCategoryInput onChange={setSelectedSubCategory} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('Global.Action.cancel')}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={isConfirmDisabled}
          loading={confirmLoading}
        >
          {t('Global.Action.link')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
