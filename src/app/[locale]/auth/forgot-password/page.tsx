'use server';

import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import ForgotPasswordView from '@/view/sections/auth/view/forgot-password-view';

export default async function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Auth' });

  return {
    title: t('forgot_password_title'),
  };
}
