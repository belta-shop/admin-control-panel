'use client';

import { CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Card, Stack, Button } from '@mui/material';

import { useBoolean } from '@/lib/hooks/use-boolean';
import { SubCategoryDetails } from '@/lib/types/api/sub-categories';

import SubCategorySingleDetails from '../single-details';
import ProductListTable from '../../products/list-table';
import SubCategoryLinkProductDialog from '../../../components/dialog/products-group/sub-category-link-product-dialog';

export default function SubCategorySingleView({
  subCategory,
}: {
  subCategory: SubCategoryDetails;
}) {
  const t = useTranslations();
  const linkDialog = useBoolean(false);

  return (
    <Stack spacing={3}>
      <SubCategorySingleDetails subCategory={subCategory} />

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" size="large" onClick={linkDialog.onTrue}>
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
          open={linkDialog.value}
          onClose={linkDialog.onFalse}
          subCategoryId={subCategory._id}
        />
      </Card>
    </Stack>
  );
}
