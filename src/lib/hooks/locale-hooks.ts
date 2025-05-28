import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { LocaleType } from '@/lib/types/locale';
import { localesSettings } from '@/lib/config/locale';

export function useCurrentLocale() {
  const locale = useLocale();

  return localesSettings[locale as LocaleType];
}

export async function getCurrentLocale() {
  const locale = await getLocale();

  return localesSettings[locale as LocaleType];
}
