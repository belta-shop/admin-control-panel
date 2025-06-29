import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getTagList } from '@/lib/actions/tags';
import PageWrapper from '@/view/components/page-wrapper';
import TagListView from '@/view/sections/tags/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'tagName' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.Tags');
  const { page, limit, tagName, disabled, employeeReadOnly } = await searchParams;

  const data = await getTagList({
    page,
    limit,
    search: tagName,
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
          href={paths.products.tags.create}
        >
          {t('create')}
        </Button>
      }
    >
      <TagListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
