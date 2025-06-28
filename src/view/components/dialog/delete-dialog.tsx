'use client';

import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';
import ConfirmDialog from './confirm-dialog';

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
    <ConfirmDialog
      title={t('Dialog.delete_title', { label })}
      isOpen={isOpen}
      onClose={onClose}
      handleConfirm={handleDelete}
      loading={loading}
      actionProps={{
        color: 'error',
        variant: 'contained',
        startIcon: <Iconify icon={Icons.TRASH} />,
        children: t('Action.delete'),
      }}
    >
      {t('Dialog.delete_content', { label: label.toLowerCase() })}
    </ConfirmDialog>
  );
}
