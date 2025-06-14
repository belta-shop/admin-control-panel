'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export async function clientRedirect(href: string) {
  console.log(href);
  try {
    redirect(href);
  } catch (err) {
    console.log(err);
  }
}
