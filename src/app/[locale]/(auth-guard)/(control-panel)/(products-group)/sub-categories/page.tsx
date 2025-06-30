import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import { getSubCategoryList } from '@/lib/actions/sub-category';
import SubCategoryListView from '@/view/sections/sub-categories/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<
      'page' | 'limit' | 'subCategoryName' | 'categoryId' | 'disabled' | 'employeeReadOnly',
      string | undefined
    >
  >;
}) {
  const t = await getTranslations('Pages.SubCategories');
  const { page, limit, subCategoryName, categoryId, disabled, employeeReadOnly } =
    await searchParams;

  const data = await getSubCategoryList({
    page,
    limit,
    search: subCategoryName,
    categoryId,
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
          href={paths.products.subCategories.create}
        >
          {t('create')}
        </Button>
      }
    >
      <SubCategoryListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
