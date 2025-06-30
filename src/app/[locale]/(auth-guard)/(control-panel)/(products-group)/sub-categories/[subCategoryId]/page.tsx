import { getLocale, getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import { getSubCategory } from '@/lib/actions/sub-category';
import SubCategorySingleView from '@/view/sections/sub-categories/view/single-view';

export default async function Page({ params }: { params: Promise<{ subCategoryId: string }> }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { subCategoryId } = await params;

  const subCategory = await getSubCategory(subCategoryId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.sub_category')} - ${
        locale === 'ar' ? subCategory.nameAr : subCategory.nameEn
      }`}
      links={[
        { label: t('Pages.Categories.title'), href: paths.products.categories.list },
        { label: t('Global.Label.category') },
      ]}
    >
      <SubCategorySingleView subCategory={subCategory} />
    </PageWrapper>
  );
}
