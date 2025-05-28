import { Cairo } from 'next/font/google';
import { TypographyVariantsOptions } from '@mui/material';

export const primaryFont = Cairo({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const typography: TypographyVariantsOptions = {
  fontFamily: primaryFont.style.fontFamily,
};
