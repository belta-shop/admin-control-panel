'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateBrand } from '@/lib/actions/brands';
import { BrandDetails } from '@/lib/types/api/brands';

import BrandNewEditForm from '../new-edit-form';

export default function BrandEditView({ brand }: { brand: BrandDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateBrand(brand._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.brand') }));
  };

  return (
    <BrandNewEditForm brand={brand} onSubmit={onSubmit} backPath={paths.products.brands.list} />
  );
}
