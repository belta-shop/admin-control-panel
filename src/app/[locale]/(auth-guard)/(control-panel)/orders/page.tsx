import { getTranslations } from 'next-intl/server';

import { getOrderList } from '@/lib/actions/orders';
import PageWrapper from '@/view/components/page-wrapper';
import OrderListView from '@/view/sections/orders/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<'page' | 'limit', string | undefined>>;
}) {
  const t = await getTranslations('Pages.Orders');
  const { page, limit } = await searchParams;

  const data = await getOrderList({
    page,
    limit,
  });

  return (
    <PageWrapper headding={t('title')}>
      <OrderListView items={data.data} total={data.metadata.total} />
    </PageWrapper>
  );
}
