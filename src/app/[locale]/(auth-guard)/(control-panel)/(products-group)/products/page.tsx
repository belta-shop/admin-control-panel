import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getProductList } from '@/lib/actions/product';
import PageWrapper from '@/view/components/page-wrapper';
import ProductListView from '@/view/sections/products/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<
      | 'page'
      | 'limit'
      | 'productName'
      | 'disabled'
      | 'brandId'
      | 'subCategoryId'
      | 'employeeReadOnly',
      string | undefined
    >
  >;
}) {
  const t = await getTranslations('Pages.Products');
  const { page, limit, productName, disabled, brandId, subCategoryId, employeeReadOnly } =
    await searchParams;

  const { data: items, metadata } = await getProductList({
    page,
    limit,
    search: productName,
    disabled,
    brand: brandId,
    subcategory: subCategoryId,
    employeeReadOnly,
  });

  return (
    <PageWrapper
      headding={t('title')}
      action={
        <Button
          variant="contained"
          size="large"
          LinkComponent={Link}
          href={paths.products.products.create}
        >
          {t('create')}
        </Button>
      }
    >
      <ProductListView items={items} total={metadata.total} />
    </PageWrapper>
  );
}
