import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Category } from '@/lib/types/api/categories';
import PageWrapper from '@/view/components/page-wrapper';
import EditCategoryView from '@/view/sections/categories/view/edit-view';

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const t = await getTranslations('Pages.Categories');
  const { categoryId } = await params;

  const { data: category } = await axiosInstance.get<Category>(
    endpoints.categories.single(categoryId)
  );

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.categories.list }, { label: t('edit') }]}
    >
      <EditCategoryView category={category} />
    </PageWrapper>
  );
}
