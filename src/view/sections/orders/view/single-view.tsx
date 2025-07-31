import { Card, Stack } from '@mui/material';

import { OrderDetails } from '@/lib/types/api/orders';

import OrderProductsList from '../products-list';
import OrderSingleDetails from '../single-details';

interface Props {
  order: OrderDetails;
}

export default function OrderSingleView({ order }: Props) {
  return (
    <Stack spacing={3}>
      <OrderSingleDetails order={order} />
      <Card>
        <OrderProductsList items={order.products} />
      </Card>
    </Stack>
  );
}
