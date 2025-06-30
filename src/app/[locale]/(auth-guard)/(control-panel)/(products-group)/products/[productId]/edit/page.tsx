import { getTranslations } from 'next-intl/server';

import { paths } from '@/lib/config/paths';
import { getProduct } from '@/lib/actions/product';
import PageWrapper from '@/view/components/page-wrapper';
import EditProductView from '@/view/sections/products/view/edit-view';

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const t = await getTranslations('Pages.Products');
  const { productId } = await params;

  const product = await getProduct(productId);

  return (
    <PageWrapper
      headding={t('edit')}
      links={[{ label: t('title'), href: paths.products.products.list }, { label: t('edit') }]}
    >
      <EditProductView product={product} />
    </PageWrapper>
  );
}
