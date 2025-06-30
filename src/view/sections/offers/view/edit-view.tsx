'use client';

import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { paths } from '@/lib/config/paths';
import { updateOffer } from '@/lib/actions/offers';
import { OfferDetails } from '@/lib/types/api/offers';

import OfferNewEditForm from '../new-edit-form';

interface Props {
  offer: OfferDetails;
}

export default function OfferEditView({ offer }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    await updateOffer(offer._id, data);
    enqueueSnackbar(t('Global.Message.update_success', { name: t('Global.Label.offer') }));
  };

  return (
    <OfferNewEditForm offer={offer} onSubmit={onSubmit} backPath={paths.products.offers.list} />
  );
}
