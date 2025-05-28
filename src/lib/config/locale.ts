import { LocaleType, LocaleSetting } from '../types/locale';

export const localesSettings: Record<LocaleType, LocaleSetting> = {
  ar: {
    label: 'العربية',
    value: 'ar',
    dir: 'rtl',
    currency: 'ر.ي',
    icon: 'flagpack:sa',
    format: {
      date: {
        locale: 'ar-eg',
        options: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      time: {
        locale: 'ar',
        options: {
          hours: 'numeric',
          minuts: 'numeric',
          timeStyle: 'short',
        },
      },
      bothPattern: '{time}، {date}',
    },
  },
  en: {
    label: 'English',
    value: 'en',
    dir: 'ltr',
    currency: 'YER',
    icon: 'flagpack:gb-nir',
    format: {
      date: {
        locale: 'en-au',
        options: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      time: {
        locale: 'en',
        options: {
          hours: 'numeric',
          minuts: 'numeric',
          timeStyle: 'short',
        },
      },
      bothPattern: '{time}, {date}',
    },
  },
};
