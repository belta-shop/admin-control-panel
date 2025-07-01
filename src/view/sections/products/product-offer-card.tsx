import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

import { Icons } from '@/lib/config/icons';
import { updateOffer } from '@/lib/actions/offers';
import StatusChip from '@/view/components/status-chip';
import DetailsCard from '@/view/components/details-card';
import { ProductDetails } from '@/lib/types/api/products';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';

export default function ProductOfferCard({ product }: { product: ProductDetails }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const { openDeleteOffer } = useDialogActions();
  const [loading, setLoading] = useState(false);

  const { offer } = product;

  const handleToggle = async () => {
    if (!offer) return;
    setLoading(true);
    try {
      await updateOffer(offer._id, {
        disabled: !offer.disabled,
      });
      enqueueSnackbar(
        t(offer.disabled ? 'Global.Message.enable_success' : 'Global.Message.disable_success', {
          name: t('Global.Label.offer'),
        })
      );
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: 'Global.Label.original_price',
      value: product.price,
    },
    {
      label: 'Global.Label.min_price',
      value: product.minPrice,
    },
    {
      label: 'Global.Label.final_price',
      value: product.finalPrice,
    },
    ...(offer
      ? [
          {
            label: 'Global.Label.offer_type',
            value: offer.type === 'percent' ? t('Global.Label.percent') : t('Global.Label.fixed'),
          },
          {
            label: 'Global.Label.value',
            value: offer.type === 'percent' ? `${(offer.value * 100).toFixed(1)}%` : offer.value,
          },
          {
            label: 'Global.Label.offer_quantity',
            value: offer.offerQuantity,
          },
          {
            label: 'Global.Label.max_per_client',
            value: offer.maxPerClient,
          },
          {
            label: 'Global.Label.disabled',
            value: <StatusChip value={!offer.disabled} />,
          },
        ]
      : []),
  ];

  const actions = offer
    ? [
        {
          label: `${offer.disabled ? t('Global.Action.enable') : t('Global.Action.disable')} ${t(
            'Global.Label.offer'
          )}`,
          icon: offer.disabled ? Icons.CHECK : Icons.XMARK,
          onClick: handleToggle,
          color: offer.disabled ? ('success' as const) : ('warning' as const),
          loading: loading,
        },
        {
          label: t('Global.Action.delete'),
          icon: Icons.TRASH,
          onClick: () => openDeleteOffer(offer._id),
          color: 'error' as const,
          loading: loading,
        },
      ]
    : [];

  return <DetailsCard fields={fields} actions={actions} disableTranslateActions />;
}
