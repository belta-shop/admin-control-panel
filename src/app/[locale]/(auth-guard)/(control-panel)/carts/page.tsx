import { getTranslations } from 'next-intl/server';

import { getCartList } from '@/lib/actions/carts';
import PageWrapper from '@/view/components/page-wrapper';
import CartListView from '@/view/sections/carts/view/list-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<'page' | 'limit', string | undefined>>;
}) {
  const t = await getTranslations('Pages.Carts');
  const { page, limit } = await searchParams;

  const data = await getCartList({
    page,
    limit,
  });

  return (
    <PageWrapper headding={t('title')}>
      <CartListView items={data.data} total={data.metadata.total} />
    </PageWrapper>
  );
}
