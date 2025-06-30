import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getCategory } from '@/lib/actions/category';
import PageWrapper from '@/view/components/page-wrapper';
import EditCategoryView from '@/view/sections/categories/view/edit-view';

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const t = await getTranslations('Pages.Categories');
  const { categoryId } = await params;

  const category = await getCategory(categoryId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.categories.list }, { label: t('edit') }]}
    >
      <EditCategoryView category={category} />
    </PageWrapper>
  );
}
