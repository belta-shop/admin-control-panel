'use client';

import { useTranslations } from 'next-intl';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

interface DeleteDialogProps {
  label: string;
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  loading?: boolean;
}

export default function DeleteDialog({
  label,
  isOpen,
  onClose,
  handleDelete,
  loading = false,
}: DeleteDialogProps) {
  const t = useTranslations('Global');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="delete-dialog-title">{t('Dialog.delete_title', { label })}</DialogTitle>
      <DialogContent>{t('Dialog.delete_content', { label: label.toLowerCase() })}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          {t('Action.cancel')}
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          loading={loading}
          startIcon={<Iconify icon={Icons.TRASH} />}
        >
          {t('Action.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
