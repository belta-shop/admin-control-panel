'use client';

import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { LabelDetails } from '@/lib/types/api/labels';

import LabelSingleDetails from '../single-details';
import ProductListTable from '../../products/list-table';
import LabelLinkProductDialog from '../link-product-dialog';

export default function LabelSingleView({ label }: { label: LabelDetails }) {
  const t = useTranslations();
  const linkDialog = useBoolean(false);

  return (
    <Stack spacing={3}>
      <LabelSingleDetails label={label} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={linkDialog.onTrue}>
              {t('Pages.Labels.link_to_product')}
            </Button>
          </Stack>
        </CardContent>
        <ProductListTable
          items={label.products}
          total={label.products.length}
          labelId={label._id}
          disablePagination
        />
      </Card>

      <LabelLinkProductDialog
        open={linkDialog.value}
        onClose={linkDialog.onFalse}
        labelId={label._id}
      />
    </Stack>
  );
}
