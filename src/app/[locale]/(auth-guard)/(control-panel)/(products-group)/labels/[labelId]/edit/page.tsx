import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getLabel } from '@/lib/actions/labels';
import PageWrapper from '@/view/components/page-wrapper';
import LabelEditView from '@/view/sections/labels/view/edit-view';

export default async function Page({ params }: { params: Promise<{ labelId: string }> }) {
  const t = await getTranslations('Pages.Labels');
  const { labelId } = await params;

  const label = await getLabel(labelId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.labels.list }, { label: t('edit') }]}
    >
      <LabelEditView label={label} />
    </PageWrapper>
  );
}
