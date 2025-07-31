import { Card } from '@mui/material';

import { Cart } from '@/lib/types/api/carts';

import CartListTable from '../list-table';

interface Props {
  items: Cart[];
  total: number;
}

export default function CartListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CartListTable {...tableProps} />
    </Card>
  );
}
