import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import BrandNewView from '@/view/sections/brands/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Brands');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.brands.list }, { label: t('create') }]}
    >
      <BrandNewView />
    </PageWrapper>
  );
}
