'use client';

import { Card, CardContent } from '@mui/material';

import { Label } from '@/lib/types/api/labels';

import LabelListTable from '../list-table';
import LabelListFilters from '../list-filters';

interface Props {
  items: Label[];
  total: number;
}

export default function LabelListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <LabelListFilters />
      </CardContent>
      <LabelListTable {...tableProps} />
    </Card>
  );
}
