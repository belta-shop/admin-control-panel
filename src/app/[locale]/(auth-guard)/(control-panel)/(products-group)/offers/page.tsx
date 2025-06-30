import Link from 'next/link';
import { Button } from '@mui/material';
import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getOfferList } from '@/lib/actions/offers';
import PageWrapper from '@/view/components/page-wrapper';
import OfferListView from '@/view/sections/offers/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<'page' | 'limit' | 'offerName' | 'disabled' | 'employeeReadOnly', string | undefined>
  >;
}) {
  const t = await getTranslations('Pages.Offers');
  const { page, limit, offerName, disabled, employeeReadOnly } = await searchParams;

  const data = await getOfferList({
    page,
    limit,
    search: offerName,
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
          href={paths.products.offers.create}
        >
          {t('create')}
        </Button>
      }
    >
      <OfferListView items={data.items} total={data.total} />
    </PageWrapper>
  );
}
