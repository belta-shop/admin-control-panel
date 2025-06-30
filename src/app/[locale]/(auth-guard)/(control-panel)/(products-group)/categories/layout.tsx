import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Categories' });

  return {
    title: t('title'),
  };
}
