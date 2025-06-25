'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateCategory } from '@/lib/actions/category';
import { CategoryDetails } from '@/lib/types/api/categories';

import CategoryNewEditForm from '../new-edit-form';

export default function EditCategoryView({ category }: { category: CategoryDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateCategory(category._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.category') }));
  };

  return (
    <CategoryNewEditForm
      category={category}
      onSubmit={onSubmit}
      backPath={paths.products.categories.list}
    />
  );
}
