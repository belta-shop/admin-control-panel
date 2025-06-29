import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import NewTagView from '@/view/sections/tags/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Tags');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.tags.list }, { label: t('create') }]}
    >
      <NewTagView />
    </PageWrapper>
  );
}
