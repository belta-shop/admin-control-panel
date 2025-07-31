import { Card, Stack } from '@mui/material';

import { CartDetails } from '@/lib/types/api/carts';

import CartProductsList from '../products-list';
import CartSingleDetails from '../single-details';

interface Props {
  cart: CartDetails;
}

export default function CartSingleView({ cart }: Props) {
  return (
    <Stack spacing={3}>
      <CartSingleDetails cart={cart} />
      <Card>
        <CartProductsList items={cart.products} />
      </Card>
    </Stack>
  );
}
