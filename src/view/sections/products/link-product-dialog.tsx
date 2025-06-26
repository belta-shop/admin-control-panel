'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { Box, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Brand } from '@/lib/types/api/brands';
import { linkProductToBrand } from '@/lib/actions/product';

import SearchBrandInput from './search-brand-input';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkBrandDialog({ open, onClose, productId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClose = useCallback(() => {
    setSelectedBrand(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedBrand && productId) {
        setConfirmLoading(true);
        await linkProductToBrand({ brandId: selectedBrand._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.product') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setConfirmLoading(false);
    }
  }, [selectedBrand, productId, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedBrand || !productId;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Pages.Products.link_to_brand')}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <SearchBrandInput onChange={setSelectedBrand} />
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
