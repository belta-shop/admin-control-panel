'use client';

import { Card, CardContent } from '@mui/material';

import { Brand } from '@/lib/types/api/brands';

import BrandListTable from '../list-table';
import BrandListFilters from '../list-filters';

interface Props {
  items: Brand[];
  total: number;
}

export default function BrandListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <BrandListFilters />
      </CardContent>
      <BrandListTable {...tableProps} />
    </Card>
  );
}
