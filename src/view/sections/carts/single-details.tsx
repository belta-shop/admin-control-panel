'use client';

import { useFormat } from '@/lib/hooks/format';
import { CartDetails } from '@/lib/types/api/carts';
import DetailsCard, { DetailsField } from '@/view/components/details-card';

export default function CartSingleDetails({ cart }: { cart: CartDetails }) {
  const { formatCurrency } = useFormat();

  const fields: DetailsField[] = [
    {
      label: 'Global.Label.user',
      value: cart.user.fullName,
    },
    {
      label: 'Global.Label.email',
      value: cart.user.email,
    },
    {
      label: 'Global.Label.total_price',
      value: formatCurrency(cart.finalPrice),
    },
    {
      label: 'Global.Label.products_count',
      value: cart.products.length,
    },
  ];

  return <DetailsCard fields={fields} />;
}
