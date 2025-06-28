'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateSubCategory } from '@/lib/actions/sub-category';
import { SubCategoryDetails } from '@/lib/types/api/sub-categories';

import SubCategoryNewEditForm from '../new-edit-form';

export default function SubCategoryEditView({ subCategory }: { subCategory: SubCategoryDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateSubCategory(subCategory._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.sub_category') }));
  };

  return (
    <SubCategoryNewEditForm
      subCategory={subCategory}
      onSubmit={onSubmit}
      backPath={paths.products.subCategories.list}
    />
  );
}
