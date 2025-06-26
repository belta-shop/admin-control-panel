'use client';

import { Card, CardContent } from '@mui/material';

import { Product } from '@/lib/types/api/products';

import ProductListTable from '../list-table';
import ProductListFilters from '../list-filters';

interface Props {
  items: Product[];
  total: number;
}

export default function ProductListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <ProductListFilters />
      </CardContent>
      <ProductListTable {...tableProps} />
    </Card>
  );
}
