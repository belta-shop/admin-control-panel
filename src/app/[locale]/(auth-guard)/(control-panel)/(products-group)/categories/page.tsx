import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import { getCategoryList } from '@/lib/actions/category';
import CategoryListView from '@/view/sections/categories/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'categoryName' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.Categories');
  const { page, limit, categoryName, disabled, employeeReadOnly } = await searchParams;

  const data = await getCategoryList({
    page,
    limit,
    search: categoryName,
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
          href={paths.products.categories.create}
        >
          {t('create')}
        </Button>
      }
    >
      <CategoryListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
