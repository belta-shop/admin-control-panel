import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getLabel } from '@/lib/actions/labels';
import { getLocaleNameKey } from '@/lib/utils/locale';
import PageWrapper from '@/view/components/page-wrapper';
import LabelSingleView from '@/view/sections/labels/view/single-view';

export default async function Page({ params }: { params: Promise<{ labelId: string }> }) {
  const t = await getTranslations();
  const { current: localeNameKey } = await getLocaleNameKey();
  const { labelId } = await params;

  const label = await getLabel(labelId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.label')} - ${label[localeNameKey]}`}
      links={[
        { label: t('Pages.Categories.title'), href: paths.products.categories.list },
        { label: t('Global.Label.category') },
      ]}
    >
      <LabelSingleView label={label} />
    </PageWrapper>
  );
}
