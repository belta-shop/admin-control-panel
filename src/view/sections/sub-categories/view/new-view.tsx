'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createSubCategory } from '@/lib/actions/sub-category';

import SubCategoryNewEditForm from '../new-edit-form';

export default function SubCategoryNewView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createSubCategory(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.category') }));
  };

  return (
    <SubCategoryNewEditForm onSubmit={onSubmit} backPath={paths.products.subCategories.list} />
  );
}
