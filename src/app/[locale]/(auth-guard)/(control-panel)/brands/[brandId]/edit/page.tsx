import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getBrand } from '@/lib/actions/brands';
import PageWrapper from '@/view/components/page-wrapper';
import BrandEditView from '@/view/sections/brands/view/edit-view';

export default async function Page({ params }: { params: Promise<{ brandId: string }> }) {
  const t = await getTranslations('Pages.Brands');
  const { brandId } = await params;

  const brand = await getBrand(brandId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.brands.list }, { label: t('edit') }]}
    >
      <BrandEditView brand={brand} />
    </PageWrapper>
  );
}
