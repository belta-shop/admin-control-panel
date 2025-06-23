import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import PageWrapper from '@/view/components/page-wrapper';
import { SubCategory } from '@/lib/types/api/sub-categories';
import SubCategoryEditView from '@/view/sections/sub-categories/view/edit-view';

export default async function Page({ params }: { params: Promise<{ subCategoryId: string }> }) {
  const t = await getTranslations('Pages.SubCategories');
  const { subCategoryId } = await params;

  const { data: subCategory } = await axiosInstance.get<SubCategory>(
    endpoints.subCategories.single(subCategoryId)
  );

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.subCategories.list }, { label: t('edit') }]}
    >
      <SubCategoryEditView subCategory={subCategory} />
    </PageWrapper>
  );
}
