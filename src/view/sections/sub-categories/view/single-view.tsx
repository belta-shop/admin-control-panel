'use client';

import { useState } from 'react';
import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { SubCategoryDetails } from '@/lib/types/api/sub-categories';

import SubCategorySingleDetails from '../single-details';
import ProductListTable from '../../products/list-table';
import SubCategoryLinkProductDialog from '../link-product-dialog';

export default function SubCategorySingleView({
  subCategory,
}: {
  subCategory: SubCategoryDetails;
}) {
  const t = useTranslations();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  return (
    <Stack spacing={3}>
      <SubCategorySingleDetails subCategory={subCategory} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={() => setIsLinkDialogOpen(true)}>
              {t('Pages.SubCategories.link_to_product')}
            </Button>
          </Stack>
        </CardContent>
        <ProductListTable
          items={subCategory.products}
          total={subCategory.products.length}
          showSubCategory={false}
          disablePagination
        />
        <SubCategoryLinkProductDialog
          open={isLinkDialogOpen}
          onClose={() => setIsLinkDialogOpen(false)}
          subCategoryId={subCategory._id}
        />
      </Card>
    </Stack>
  );
}
