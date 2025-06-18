import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import NewCategoryView from '@/view/sections/categories/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Categories');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.categories.list }, { label: t('create') }]}
    >
      <NewCategoryView />
    </PageWrapper>
  );
}
