'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { createOffer } from '@/lib/actions/offers';

import OfferNewEditForm from '../new-edit-form';

export default function OfferNewView() {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await createOffer(data);
    enqueueSnackbar(t('Global.Message.create_success', { name: t('Global.Label.offer') }));
  };

  return <OfferNewEditForm onSubmit={onSubmit} backPath={paths.products.offers.list} />;
}
