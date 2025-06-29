'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createTag } from '@/lib/actions/tags';

import TagNewEditForm from '../new-edit-form';

export default function TagNewView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createTag(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.tag') }));
  };

  return <TagNewEditForm onSubmit={onSubmit} backPath={paths.products.tags.list} />;
}
