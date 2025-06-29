'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

import { Tag } from '@/lib/types/api/tags';
import { useBoolean } from '@/lib/hooks/use-boolean';
import { linkTagToProduct } from '@/lib/actions/tags';
import ConfirmDialog from '@/view/components/dialog/confirm-dialog';
import { TagsAutoComplete } from '@/view/components/api-related/auto-complete-modules';

interface Props {
  open: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductLinkTagDialog({ open, onClose, productId }: Props) {
  const t = useTranslations();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const loading = useBoolean(false);

  const handleClose = useCallback(() => {
    setSelectedTag(null);
    onClose();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      if (selectedTag && productId) {
        loading.onTrue();
        await linkTagToProduct({ tagId: selectedTag._id, productId });
        enqueueSnackbar(t('Global.Message.link_success', { name: t('Global.Label.tag') }));
        handleClose();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      loading.onFalse();
    }
  }, [selectedTag, productId, loading, enqueueSnackbar, t, handleClose]);

  const isConfirmDisabled = !selectedTag || !productId;

  return (
    <ConfirmDialog
      title={t('Pages.Products.link_to_tag')}
      isOpen={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      loading={loading.value}
      disabled={isConfirmDisabled}
    >
      <TagsAutoComplete onChange={setSelectedTag} sx={{ mt: 2 }} />
    </ConfirmDialog>
  );
}
