import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { DEFAULT_LIMIT } from '@/lib/config/global';
import { Category } from '@/lib/types/api/categories';
import PageWrapper from '@/view/components/page-wrapper';
import ListView from '@/view/sections/categories/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<'page' | 'limit', string | undefined>>;
}) {
  const t = await getTranslations('Pages.Categories');
  const { page, limit } = await searchParams;

  const { data } = await axiosInstance.get<{ items: Category[]; total: number }>(
    endpoints.categories.list,
    {
      params: {
        page: page || '1',
        limit: limit || DEFAULT_LIMIT,
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
          href={paths.products.categories.create}
        >
          {t('create')}
        </Button>
      }
    >
      <ListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
