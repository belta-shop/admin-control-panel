import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getTag } from '@/lib/actions/tags';
import { getLocaleNameKey } from '@/lib/utils/locale';
import PageWrapper from '@/view/components/page-wrapper';
import TagSingleView from '@/view/sections/tags/view/single-view';

export default async function Page({ params }: { params: Promise<{ tagId: string }> }) {
  const t = await getTranslations();
  const { current: localeNameKey } = await getLocaleNameKey();
  const { tagId } = await params;

  const tag = await getTag(tagId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.tag')} - ${tag[localeNameKey]}`}
      links={[
        { label: t('Pages.Categories.title'), href: paths.products.categories.list },
        { label: t('Global.Label.category') },
      ]}
    >
      <TagSingleView tag={tag} />
    </PageWrapper>
  );
}
