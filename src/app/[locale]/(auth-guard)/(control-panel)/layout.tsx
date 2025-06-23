import { getTranslations } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import ControlPanelLayout from '@/view/layout/control-panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ControlPanelLayout>{children}</ControlPanelLayout>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Home' });

  return {
    title: t('title'),
  };
}
