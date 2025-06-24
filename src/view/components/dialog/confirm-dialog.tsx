'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  Button,
  DialogTitle,
  ButtonProps,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

interface ConfirmDialogProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  loading?: boolean;
  actionProps?: Omit<ButtonProps, 'onClick' | 'loading'>;
}

export default function ConfirmDialog({
  title,
  content,
  isOpen,
  onClose,
  handleConfirm,
  loading = false,
  actionProps,
}: ConfirmDialogProps) {
  const t = useTranslations();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          {t('Global.Action.cancel')}
        </Button>
        {actionProps ? (
          <Button onClick={handleConfirm} loading={loading} {...actionProps} />
        ) : (
          <Button
            onClick={handleConfirm}
            color="success"
            variant="contained"
            loading={loading}
            startIcon={<Iconify icon={Icons.CHECK} />}
          >
            {t('Global.Action.confirm')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
