'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createLabel } from '@/lib/actions/labels';

import LabelNewEditForm from '../new-edit-form';

export default function LabelNewView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createLabel(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.label') }));
  };

  return <LabelNewEditForm onSubmit={onSubmit} backPath={paths.products.labels.list} />;
}
