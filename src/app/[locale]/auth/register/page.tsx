import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import RegisterView from '@/view/sections/auth/view/register-view';

export default function RegisterPage() {
  return <RegisterView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Auth' });

  return {
    title: t('register_title'),
  };
}
