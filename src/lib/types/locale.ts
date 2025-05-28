import { routing } from '../i18n/routing';

export type LocaleType = typeof routing.defaultLocale;

export interface LocaleSetting {
  label: string;
  value: LocaleType;
  dir: 'ltr' | 'rtl';
  currency: string;
  icon: string;
  format: Record<'date' | 'time', { locale: string; options: Record<string, string> }> & {
    bothPattern: string;
  };
}
