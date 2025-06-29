'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateTag } from '@/lib/actions/tags';
import { TagDetails } from '@/lib/types/api/tags';

import TagNewEditForm from '../new-edit-form';

export default function TagEditView({ tag }: { tag: TagDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateTag(tag._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.tag') }));
  };

  return <TagNewEditForm tag={tag} onSubmit={onSubmit} backPath={paths.products.tags.list} />;
}
