'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createCategory } from '@/lib/actions/category';

import CategoryNewEditForm from '../new-edit-form';

export default function NewCategoryView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createCategory(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.category') }));
  };

  return <CategoryNewEditForm onSubmit={onSubmit} backPath={paths.products.categories.list} />;
}
