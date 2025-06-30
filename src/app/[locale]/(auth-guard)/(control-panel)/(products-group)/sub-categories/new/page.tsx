import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import NewSubCategoryView from '@/view/sections/sub-categories/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.SubCategories');

  return (
    <PageWrapper
      headding={t('create')}
      links={[
        { label: t('title'), href: paths.products.subCategories.list },
        { label: t('create') },
      ]}
    >
      <NewSubCategoryView />
    </PageWrapper>
  );
}
