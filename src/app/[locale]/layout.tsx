import 'src/global.css';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import { localesSettings, LocaleType } from '@/lib/config/locale';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: LocaleType }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { dir } = localesSettings[locale];

  return (
    <main lang={locale} dir={dir} style={{ minHeight: '100vh' }}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
