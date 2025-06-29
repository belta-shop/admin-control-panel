'use client';

import { useTranslations } from 'next-intl';
import { Card, Stack, Button, CardContent } from '@mui/material';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { ProductDetails } from '@/lib/types/api/products';

import TagListTable from '../../tags/list-table';
import ProductSingleDetails from '../single-details';
import LabelListTable from '../../labels/list-table';
import ProductLinkTagDialog from '../link-tag-dialog';
import ProductLinkLabelDialog from '../link-label-dialog';

export default function ProductSingleView({ product }: { product: ProductDetails }) {
  const t = useTranslations();

  const linkTagDialog = useBoolean(false);
  const linkLabelDialog = useBoolean(false);

  return (
    <Stack spacing={3}>
      <ProductSingleDetails product={product} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={linkTagDialog.onTrue}>
              {t('Pages.Products.link_to_tag')}
            </Button>
          </Stack>
        </CardContent>
        <TagListTable
          items={product.tags}
          total={product.tags.length}
          disablePagination
          productId={product._id}
        />
      </Card>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={linkLabelDialog.onTrue}>
              {t('Pages.Products.link_to_label')}
            </Button>
          </Stack>
        </CardContent>
        <LabelListTable
          items={product.labels}
          total={product.labels.length}
          disablePagination
          productId={product._id}
        />
      </Card>

      <ProductLinkTagDialog
        open={linkTagDialog.value}
        onClose={linkTagDialog.onFalse}
        productId={product._id}
      />

      <ProductLinkLabelDialog
        open={linkLabelDialog.value}
        onClose={linkLabelDialog.onFalse}
        productId={product._id}
      />
    </Stack>
  );
}
