import { LocaleSetting, LocaleType } from '../types/locale';

export const localesSettings: Record<LocaleType, LocaleSetting> = {
  ar: {
    label: 'العربية',
    value: 'ar',
    dir: 'rtl',
    currency: 'ر.ي',
    icon: 'flagpack:sa',
  },
  en: {
    label: 'English',
    value: 'en',
    dir: 'ltr',
    currency: 'YER',
    icon: 'flagpack:gb-nir',
  },
};
