import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getCart } from '@/lib/actions/carts';
import PageWrapper from '@/view/components/page-wrapper';
import CartSingleView from '@/view/sections/carts/view/single-view';

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const t = await getTranslations('Pages.Carts');
  const { userId } = await params;

  const cart = await getCart(userId);

  return (
    <PageWrapper
      headding={t('single_title')}
      links={[{ label: t('title'), href: paths.users.carts.list }, { label: t('single_title') }]}
    >
      <CartSingleView cart={cart} />
    </PageWrapper>
  );
}
