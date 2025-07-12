import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getLabelList } from '@/lib/actions/labels';
import PageWrapper from '@/view/components/page-wrapper';
import LabelListView from '@/view/sections/labels/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'labelName' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.Labels');
  const { page, limit, labelName, disabled, employeeReadOnly } = await searchParams;

  const data = await getLabelList({
    page,
    limit,
    search: labelName,
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
          href={paths.products.labels.create}
        >
          {t('create')}
        </Button>
      }
    >
      <LabelListView items={data.data} total={data.metadata.total} />
    </PageWrapper>
  );
}
