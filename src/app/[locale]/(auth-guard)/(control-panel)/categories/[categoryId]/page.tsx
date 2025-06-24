import { getLocale, getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import PageWrapper from '@/view/components/page-wrapper';
import { CategoryDetails } from '@/lib/types/api/categories';
import CategorySingleView from '@/view/sections/categories/view/single-view';

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { categoryId } = await params;

  const { data: category } = await axiosInstance.get<CategoryDetails>(
    endpoints.categories.single(categoryId)
  );

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
