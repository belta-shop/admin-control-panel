'use server';

import { cookies } from 'next/headers';

import { LoginResponse } from '../types/auth';
import { COOKIES_KEYS } from '../config/global';

export async function SaveSessionCookies(response: LoginResponse) {
  const { accessToken, accessTokenExpireDate, refreshToken, refreshTokenExpireDate, ...user } =
    response;

  const cookiesStore = await cookies();

  cookiesStore.set(COOKIES_KEYS.User, JSON.stringify(user), {
    expires: new Date(accessTokenExpireDate),
    httpOnly: true,
    secure: true,
  });
  cookiesStore.set(COOKIES_KEYS.AccessToken, accessToken, {
    expires: new Date(accessTokenExpireDate),
    httpOnly: true,
    secure: true,
  });
  cookiesStore.set(COOKIES_KEYS.RefreshToken, refreshToken, {
    expires: new Date(refreshTokenExpireDate),
    httpOnly: true,
    secure: true,
  });
}
