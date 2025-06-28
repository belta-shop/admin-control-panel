import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Product } from '@/lib/types/api/products';
import { linkProductToSubCategory } from '@/lib/actions/product';

import SearchProductInput from '../brands/search-product-input';

interface Props {
  open: boolean;
  onClose: () => void;
  subCategoryId?: string;
}

export default function SubCategoryLinkProductDialog({ open, onClose, subCategoryId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClose = useCallback(() => {
    setSelectedProduct(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedProduct && subCategoryId) {
        setConfirmLoading(true);
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
      setConfirmLoading(false);
    }
  }, [selectedProduct, subCategoryId, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedProduct || !subCategoryId;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Pages.SubCategories.link_to_product')}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <SearchProductInput onChange={setSelectedProduct} />
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
