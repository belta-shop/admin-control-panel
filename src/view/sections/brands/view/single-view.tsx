'use client';

import { useState } from 'react';
import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { BrandDetails } from '@/lib/types/api/brands';

import BrandSingleDetails from '../single-details';
import ProductListTable from '../../products/list-table';
import BrandLinkProductDialog from '../link-product-dialog';

export default function BrandSingleView({ brand }: { brand: BrandDetails }) {
  const t = useTranslations();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  return (
    <Stack spacing={3}>
      <BrandSingleDetails brand={brand} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={() => setIsLinkDialogOpen(true)}>
              {t('Pages.Brands.link_to_product')}
            </Button>
          </Stack>
        </CardContent>
        <ProductListTable
          items={brand.products}
          total={brand.products.length}
          disablePagination
          showBrand={false}
        />
        <BrandLinkProductDialog
          open={isLinkDialogOpen}
          onClose={() => setIsLinkDialogOpen(false)}
          brandId={brand._id}
        />
      </Card>
    </Stack>
  );
}
