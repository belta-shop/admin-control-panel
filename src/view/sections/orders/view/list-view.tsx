import { Card } from '@mui/material';

import { Order } from '@/lib/types/api/orders';

import OrderListTable from '../list-table';

interface Props {
  items: Order[];
  total: number;
}

export default function OrderListView({ ...tableProps }: Props) {
  return (
    <Card>
      <OrderListTable {...tableProps} />
    </Card>
  );
}
