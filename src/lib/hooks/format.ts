import { LocaleSetting } from '../types/locale';
import { getCurrentLocale, useCurrentLocale } from './locale-hooks';

type InputValue = Date | string | number | null | undefined;

const refactorDate = (value: InputValue): Date => {
  if (value instanceof Date) return value;

  if (typeof value === 'string' || typeof value === 'number') return new Date(value);

  return new Date();
};

function buildFormatters(localeSettings: LocaleSetting) {
  const {
    currency,
    format: { date, time, bothPattern },
  } = localeSettings;

  const formatDate = (dateValue: InputValue, dateOptions?: Record<string, string>) => {
    let dateObj: Date = refactorDate(dateValue);

    const { locale, options: initialOptions } = date;
    return new Intl.DateTimeFormat(locale, { ...initialOptions, ...dateOptions }).format(dateObj);
  };

  const formatTime = (dateValue: InputValue, timeOptions?: Record<string, string>) => {
    let dateObj: Date = refactorDate(dateValue);

    const { locale, options: initialOptions } = time;
    return new Intl.DateTimeFormat(locale, { ...initialOptions, ...timeOptions }).format(dateObj);
  };

  const formatTimeDate = (dateValue: InputValue, timeDateOptions?: Record<string, string>) => {
    return bothPattern.replace(/{(time|date)}/g, (match) =>
      match === '{time}'
        ? formatTime(dateValue, timeDateOptions)
        : formatDate(dateValue, timeDateOptions)
    );
  };

  const formatCurrency = (inputValue: number | string, currencyCode = true) => {
    const number = Number(inputValue);

    const fm = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return currencyCode ? `${fm} ${currency}` : fm;
  };

  return { formatDate, formatTime, formatTimeDate, formatCurrency };
}

export function useFormat() {
  const formateSettings = useCurrentLocale();

  return buildFormatters(formateSettings);
}

export async function getFormat() {
  const formateSettings = await getCurrentLocale();

  return buildFormatters(formateSettings);
}
