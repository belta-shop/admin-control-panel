'use server';

import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import ResetPasswordView from '@/view/sections/auth/view/reset-password-view';

export default async function ResetPasswordPage() {
  return <ResetPasswordView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Auth' });

  return {
    title: t('reset_password_title'),
  };
}
