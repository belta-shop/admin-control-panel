import { getLocale, getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getBrand } from '@/lib/actions/brands';
import PageWrapper from '@/view/components/page-wrapper';
import BrandSingleView from '@/view/sections/brands/view/single-view';

export default async function Page({ params }: { params: Promise<{ brandId: string }> }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { brandId } = await params;

  const brand = await getBrand(brandId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.brand')} - ${locale === 'ar' ? brand.nameAr : brand.nameEn}`}
      links={[
        { label: t('Pages.Brands.title'), href: paths.products.brands.list },
        { label: t('Global.Label.brand') },
      ]}
    >
      <BrandSingleView brand={brand} />
    </PageWrapper>
  );
}
