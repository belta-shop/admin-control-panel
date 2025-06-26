import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

type LocaleNameKey = 'nameAr' | 'nameEn';
interface ReturnLocaleNameKey {
  current: LocaleNameKey;
  other: LocaleNameKey;
}

export async function getLocaleNameKey(): Promise<ReturnLocaleNameKey> {
  const locale = await getLocale();
  return {
    current: locale === 'ar' ? 'nameAr' : 'nameEn',
    other: locale === 'ar' ? 'nameEn' : 'nameAr',
  };
}

export function useLocaleNameKey(): ReturnLocaleNameKey {
  const locale = useLocale();
  return {
    current: locale === 'ar' ? 'nameAr' : 'nameEn',
    other: locale === 'ar' ? 'nameEn' : 'nameAr',
  };
}
