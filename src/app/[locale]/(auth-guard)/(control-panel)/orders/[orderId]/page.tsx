import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getOrder } from '@/lib/actions/orders';
import PageWrapper from '@/view/components/page-wrapper';
import OrderSingleView from '@/view/sections/orders/view/single-view';

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const t = await getTranslations('Pages.Orders');
  const { orderId } = await params;

  const order = await getOrder(orderId);

  return (
    <PageWrapper
      headding={t('single_title')}
      links={[{ label: t('title'), href: paths.users.orders.list }, { label: t('single_title') }]}
    >
      <OrderSingleView order={order} />
    </PageWrapper>
  );
}
