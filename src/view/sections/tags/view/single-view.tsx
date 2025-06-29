'use client';

import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { TagDetails } from '@/lib/types/api/tags';
import { useBoolean } from '@/lib/hooks/use-boolean';

import TagSingleDetails from '../single-details';
import ProductListTable from '../../products/list-table';
import TagLinkProductDialog from '../link-product-dialog';

export default function TagSingleView({ tag }: { tag: TagDetails }) {
  const t = useTranslations();
  const linkDialog = useBoolean(false);

  return (
    <Stack spacing={3}>
      <TagSingleDetails tag={tag} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={linkDialog.onTrue}>
              {t('Pages.Tags.link_to_product')}
            </Button>
          </Stack>
        </CardContent>
        <ProductListTable
          items={tag.products}
          total={tag.products.length}
          tagId={tag._id}
          disablePagination
        />
      </Card>

      <TagLinkProductDialog open={linkDialog.value} onClose={linkDialog.onFalse} tagId={tag._id} />
    </Stack>
  );
}
