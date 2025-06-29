import { getLocale, getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getProduct } from '@/lib/actions/product';
import PageWrapper from '@/view/components/page-wrapper';
import ProductSingleView from '@/view/sections/products/view/single-view';

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { productId } = await params;

  const product = await getProduct(productId);

  return (
    <PageWrapper
      headding={`${t('Global.Label.product')} - ${
        locale === 'ar' ? product.nameAr : product.nameEn
      }`}
      links={[
        { label: t('Pages.Products.title'), href: paths.products.products.list },
        { label: t('Global.Label.product') },
      ]}
    >
      <ProductSingleView product={product} />
    </PageWrapper>
  );
}
