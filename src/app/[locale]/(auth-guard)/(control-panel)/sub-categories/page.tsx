import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { DEFAULT_LIMIT } from '@/lib/config/global';
import PageWrapper from '@/view/components/page-wrapper';
import { SubCategory } from '@/lib/types/api/sub-categories';
import SubCategoryListView from '@/view/sections/sub-categories/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'subCategory' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.SubCategories');
  const { page, limit, subCategory, disabled, employeeReadOnly } = await searchParams;

  const { data } = await axiosInstance.get<{ items: SubCategory[]; total: number }>(
    endpoints.subCategories.list,
    {
      params: {
        page: page || '1',
        limit: limit || DEFAULT_LIMIT,
        search: subCategory || undefined,
        disabled: disabled || undefined,
        employeeReadOnly: employeeReadOnly || undefined,
      },
    }
  );

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
