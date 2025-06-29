'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Label } from '@/lib/types/api/labels';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkLabelToProduct } from '@/lib/actions/labels';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { LabelsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkLabelDialog({ open, onClose, productId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedLabel(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedLabel && productId) {
        loading.onTrue();
        await linkLabelToProduct({ labelId: selectedLabel._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.label') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedLabel, productId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedLabel || !productId;

  return (
    <ConfirmDialog
      title={t('Pages.Products.link_to_label')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <LabelsAutoComplete onChange={setSelectedLabel} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
