import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import NewProductView from '@/view/sections/products/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Products');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.products.list }, { label: t('create') }]}
    >
      <NewProductView />
    </PageWrapper>
  );
}
