import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getBrandList } from '@/lib/actions/brands';
import PageWrapper from '@/view/components/page-wrapper';
import BrandListView from '@/view/sections/brands/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'brandName' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.Brands');
  const { page, limit, brandName, disabled, employeeReadOnly } = await searchParams;

  const data = await getBrandList({
    page,
    limit,
    search: brandName,
    disabled,
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
          href={paths.products.brands.create}
        >
          {t('create')}
        </Button>
      }
    >
      <BrandListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
