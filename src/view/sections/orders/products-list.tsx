'use client';

import { paths } from '@/lib/config/paths';
import { useFormat } from '@/lib/hooks/format';
import { CartProduct } from '@/lib/types/api/carts';
import CustomTable from '@/view/components/custom-table/custom-table';
import ApiListItem from '@/view/components/api-related/api-list-item';

interface Props {
  items: CartProduct[];
}

export default function OrderProductsList({ items }: Props) {
  const { formatCurrency } = useFormat();

  const customRender = {
    product: (row: CartProduct) => (
      <ApiListItem
        nameAr={row.nameAr}
        nameEn={row.nameEn}
        cover={row.cover}
        href={paths.products.products.single(row.productId)}
      />
    ),
    itemPrice: (row: CartProduct) => formatCurrency(row.itemPrice),
    totalPrice: (row: CartProduct) => formatCurrency(row.totalPrice),
  };

  return (
    <CustomTable
      tableHead={tableHead}
      count={items.length}
      data={items.map((item) => ({ ...item, id: item._id }))}
      customRender={customRender}
      disablePagination
    />
  );
}

const tableHead = [
  {
    id: 'product',
    label: 'product',
  },
  {
    id: 'itemPrice',
    label: 'price',
  },
  {
    id: 'quantity',
    label: 'quantity',
  },
  {
    id: 'totalPrice',
    label: 'total_price',
  },
];
