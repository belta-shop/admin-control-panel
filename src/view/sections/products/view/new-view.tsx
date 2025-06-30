'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createProduct } from '@/lib/actions/product';

import ProductNewEditForm from '../new-edit-form';

export default function NewProductView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createProduct(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.product') }));
  };

  return <ProductNewEditForm onSubmit={onSubmit} backPath={paths.products.products.list} />;
}
