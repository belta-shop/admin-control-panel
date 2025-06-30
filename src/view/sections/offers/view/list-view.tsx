import { Card, CardContent } from '@mui/material';

import { Offer } from '@/lib/types/api/offers';

import OfferListTable from '../list-table';
import OfferListFilters from '../list-filters';

interface Props {
  items: Offer[];
  total: number;
}

export default function OfferListView({ ...tableProps }: Props) {
  return (
    <Card>
      <CardContent>
        <OfferListFilters />
      </CardContent>
      <OfferListTable {...tableProps} />
    </Card>
  );
}
