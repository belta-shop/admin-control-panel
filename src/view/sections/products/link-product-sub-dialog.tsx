'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { SubCategory } from '@/lib/types/api/sub-categories';
import { linkProductToSubCategory } from '@/lib/actions/product';

import SearchSubCategoryInput from '../categories/search-sub-category-input';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkSubCategoryDialog({ open, onClose, productId }: Props) {
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
      if (selectedSubCategory && productId) {
        setConfirmLoading(true);
        await linkProductToSubCategory({ subCategoryId: selectedSubCategory._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.product') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setConfirmLoading(false);
    }
  }, [selectedSubCategory, productId, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedSubCategory || !productId;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Pages.Products.link_to_brand')}</DialogTitle>

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
