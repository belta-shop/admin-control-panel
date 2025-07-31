'use client';

import { Chip } from '@mui/material';
import { useTranslations } from 'next-intl';

import { useFormat } from '@/lib/hooks/format';
import { OrderDetails } from '@/lib/types/api/orders';
import DetailsCard, { DetailsField } from '@/view/components/details-card';

export default function OrderSingleDetails({ order }: { order: OrderDetails }) {
  const t = useTranslations();
  const { formatCurrency } = useFormat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'primary';
      case 'cancelled':
        return 'error';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.user',
      value: order.user.fullName,
    },
    {
      label: 'Global.Label.email',
      value: order.user.email,
    },
    {
      label: 'Global.Label.total_price',
      value: formatCurrency(order.finalPrice),
    },
    {
      label: 'Global.Label.products_count',
      value: order.products.length,
    },
    {
      label: 'Global.Label.status',
      value: (
        <Chip
          label={t(`Global.Label.${order.status}`)}
          color={getStatusColor(order.status)}
          size="small"
          sx={{
            borderRadius: 1,
            py: 1.75,
            px: 0.5,
            fontWeight: 'normal',
          }}
        />
      ),
    },
  ];

  return <DetailsCard fields={fields} />;
}
