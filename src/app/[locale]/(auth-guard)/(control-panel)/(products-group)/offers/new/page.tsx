import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import OfferNewView from '@/view/sections/offers/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Offers');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.offers.list }, { label: t('create') }]}
    >
      <OfferNewView />
    </PageWrapper>
  );
}
