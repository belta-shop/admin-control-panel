import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getTag } from '@/lib/actions/tags';
import PageWrapper from '@/view/components/page-wrapper';
import TagEditView from '@/view/sections/tags/view/edit-view';

export default async function Page({ params }: { params: Promise<{ tagId: string }> }) {
  const t = await getTranslations('Pages.Tags');
  const { tagId } = await params;

  const tag = await getTag(tagId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.tags.list }, { label: t('edit') }]}
    >
      <TagEditView tag={tag} />
    </PageWrapper>
  );
}
