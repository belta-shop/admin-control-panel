'use client';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';

import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

// Configure dayjs to use Arabic locale with 12-hour format
dayjs.locale('ar');
dayjs.extend(updateLocale);
dayjs.updateLocale('ar', {
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd D MMMM YYYY h:mm A',
  },
});

export default function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const { value: locale } = useCurrentLocale();

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      {children}
    </MuiLocalizationProvider>
  );
}
