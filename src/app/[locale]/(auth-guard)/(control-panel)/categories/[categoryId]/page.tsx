import { getLocale, getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getCategory } from '@/lib/actions/category';
import PageWrapper from '@/view/components/page-wrapper';
import CategorySingleView from '@/view/sections/categories/view/single-view';

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { categoryId } = await params;

  const category = await getCategory(categoryId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.category')} - ${
        locale === 'ar' ? category.nameAr : category.nameEn
      }`}
      links={[
        { label: t('Pages.Categories.title'), href: paths.products.categories.list },
        { label: t('Global.Label.category') },
      ]}
    >
      <CategorySingleView category={category} />
    </PageWrapper>
  );
}
