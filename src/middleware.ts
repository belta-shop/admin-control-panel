import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './lib/i18n/routing';
import { COOKIES_KEYS } from './lib/config/global';

export default async function middleware(request: NextRequest) {
  const [, locale, ..._] = request.nextUrl.pathname.split('/');

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  // forcing the locale to be set in the cookies
  if (locale != null) response.cookies.set(COOKIES_KEYS.Locale, locale);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
