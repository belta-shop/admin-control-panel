import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import NewLabelView from '@/view/sections/labels/view/new-view';

export default async function Page() {
  const t = await getTranslations('Pages.Labels');

  return (
    <PageWrapper
      headding={t('create')}
      links={[{ label: t('title'), href: paths.products.labels.list }, { label: t('create') }]}
    >
      <NewLabelView />
    </PageWrapper>
  );
}
