import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import PageWrapper from '@/view/components/page-wrapper';
import { getSubCategory } from '@/lib/actions/sub-category';
import SubCategoryEditView from '@/view/sections/sub-categories/view/edit-view';

export default async function Page({ params }: { params: Promise<{ subCategoryId: string }> }) {
  const t = await getTranslations('Pages.SubCategories');
  const { subCategoryId } = await params;

  const subCategory = await getSubCategory(subCategoryId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.subCategories.list }, { label: t('edit') }]}
    >
      <SubCategoryEditView subCategory={subCategory} />
    </PageWrapper>
  );
}
