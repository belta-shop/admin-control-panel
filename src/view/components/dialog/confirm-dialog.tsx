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
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  loading?: boolean;
  disabled?: boolean;
  actionProps?: Omit<ButtonProps, 'onClick' | 'loading' | 'disabled'>;
}

export default function ConfirmDialog({
  title,
  children,
  isOpen,
  onClose,
  handleConfirm,
  loading = false,
  disabled = false,
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
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading || disabled}>
          {t('Global.Action.cancel')}
        </Button>
        {actionProps ? (
          <Button onClick={handleConfirm} loading={loading} disabled={disabled} {...actionProps} />
        ) : (
          <Button
            onClick={handleConfirm}
            color="success"
            variant="contained"
            loading={loading}
            disabled={disabled}
            startIcon={<Iconify icon={Icons.CHECK} />}
          >
            {t('Global.Action.confirm')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
