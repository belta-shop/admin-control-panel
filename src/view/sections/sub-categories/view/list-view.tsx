'use client';

import { Card, CardContent } from '@mui/material';

import { SubCategory } from '@/lib/types/api/sub-categories';

import SubCategoryListTable from '../list-table';
import SubCategoryListFilters from '../list-filters';

interface Props {
  items: SubCategory[];
  total: number;
}

export default function SubCategoryListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <SubCategoryListFilters />
      </CardContent>
      <SubCategoryListTable {...tableProps} />
    </Card>
  );
}
