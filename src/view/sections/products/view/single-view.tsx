'use client';

import { useTranslations } from 'next-intl';
import { Card, Stack, Button, CardContent } from '@mui/material';

import { ProductDetails } from '@/lib/types/api/products';
import { useDialogActions } from '@/lib/hooks/use-dialog-actions';

import TagListTable from '../../tags/list-table';
import ProductOfferCard from '../product-offer-card';
import ProductSingleDetails from '../single-details';
import LabelListTable from '../../labels/list-table';

export default function ProductSingleView({ product }: { product: ProductDetails }) {
  const t = useTranslations();

  const { openLinkProductToLabel, openLinkProductToTag } = useDialogActions();

  const renderTagsCard = (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            onClick={() => openLinkProductToTag(product._id)}
          >
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
  );

  const renderLabelsCard = (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            onClick={() => openLinkProductToLabel(product._id)}
          >
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
  );

  return (
    <Stack spacing={3}>
      <ProductSingleDetails product={product} />
      <ProductOfferCard product={product} />
      {renderTagsCard}
      {renderLabelsCard}
    </Stack>
  );
}
