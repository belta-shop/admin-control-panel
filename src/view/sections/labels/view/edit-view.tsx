'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateLabel } from '@/lib/actions/labels';
import { LabelDetails } from '@/lib/types/api/labels';

import LabelNewEditForm from '../new-edit-form';

export default function LabelEditView({ label }: { label: LabelDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateLabel(label._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.label') }));
  };

  return (
    <LabelNewEditForm label={label} onSubmit={onSubmit} backPath={paths.products.labels.list} />
  );
}
