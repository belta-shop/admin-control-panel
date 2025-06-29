'use client';

import { Card, CardContent } from '@mui/material';

import { Tag } from '@/lib/types/api/tags';

import TagListTable from '../list-table';
import TagListFilters from '../list-filters';

interface Props {
  items: Tag[];
  total: number;
}

export default function TagListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <TagListFilters />
      </CardContent>
      <TagListTable {...tableProps} />
    </Card>
  );
}
