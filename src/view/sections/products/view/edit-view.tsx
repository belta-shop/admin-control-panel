'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateProduct } from '@/lib/actions/product';
import { ProductDetails } from '@/lib/types/api/products';

import ProductNewEditForm from '../new-edit-form';

export default function EditProductView({ product }: { product: ProductDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateProduct(product._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.product') }));
  };

  return (
    <ProductNewEditForm
      product={product}
      onSubmit={onSubmit}
      backPath={paths.products.products.list}
    />
  );
}
