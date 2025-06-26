'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createBrand } from '@/lib/actions/brands';

import BrandNewEditForm from '../new-edit-form';

export default function BrandNewView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createBrand(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.brand') }));
  };

  return <BrandNewEditForm onSubmit={onSubmit} backPath={paths.products.brands.list} />;
}
