'use client';

import { Card, CardContent } from '@mui/material';

import { Category } from '@/lib/types/api/categories';

import CategoryListTable from '../list-table';
import CategoryListFilters from '../list-filters';

interface Props {
  items: Category[];
  total: number;
}

export default function CategoryListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <CategoryListFilters />
      </CardContent>
      <CategoryListTable {...tableProps} />
    </Card>
  );
}
