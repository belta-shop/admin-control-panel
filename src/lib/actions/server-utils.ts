'use server';

import { cookies } from 'next/headers';

import { routing } from '@/lib/i18n/routing';
import { COOKIES_KEYS } from '@/lib/config/global';

export async function getServerHeaders() {
  const awaitedCookies = await cookies();

  const headers: any = {};

  const locale = awaitedCookies.get(COOKIES_KEYS.Locale)?.value || routing.defaultLocale;
  if (locale) headers['Accept-Language'] = locale;

  const accessToken = awaitedCookies.get(COOKIES_KEYS.AccessToken)?.value;
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  return headers;
}
