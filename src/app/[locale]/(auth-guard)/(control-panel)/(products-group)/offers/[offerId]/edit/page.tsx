import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getOffer } from '@/lib/actions/offers';
import PageWrapper from '@/view/components/page-wrapper';
import OfferEditView from '@/view/sections/offers/view/edit-view';

export default async function Page({ params }: { params: Promise<{ offerId: string }> }) {
  const t = await getTranslations('Pages.Offers');
  const { offerId } = await params;

  const offer = await getOffer(offerId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[
        { label: t('title'), href: paths.products.offers.list },
        {
          label: offer.nameEn || offer.nameAr || t('title'),
          href: paths.products.offers.single(offerId),
        },
        { label: t('edit') },
      ]}
    >
      <OfferEditView offer={offer} />
    </PageWrapper>
  );
}
