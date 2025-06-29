'use server';

import { cookies } from 'next/headers';

import { axiosInstance } from '../utils/axios';
import { COOKIES_KEYS } from '../config/global';
import { endpoints } from '../config/endpoints';
import { User, LoginResponse } from '../types/auth';

export async function saveSessionCookies(response: LoginResponse) {
  const { accessToken, accessTokenExpireDate, refreshToken, refreshTokenExpireDate, ...user } =
    response;

  const cookiesStore = await cookies();

  cookiesStore.set(COOKIES_KEYS.User, JSON.stringify(user), {
    expires: new Date(refreshTokenExpireDate),
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

export async function fetchUserByToken() {
  try {
    const { user, refreshToken } = await restoreSessionCookies();

    if (!user || !refreshToken) {
      return { error: 'User not found' };
    }

    const res = await axiosInstance.post(endpoints.auth.refresh, { token: refreshToken });

    const loginResponse = res.data as LoginResponse;

    return loginResponse;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function restoreSessionCookies() {
  const cookiesStore = await cookies();

  const userCookie = cookiesStore.get(COOKIES_KEYS.User);
  const accessTokenCookie = cookiesStore.get(COOKIES_KEYS.AccessToken);
  const refreshTokenCookie = cookiesStore.get(COOKIES_KEYS.RefreshToken);

  const user = userCookie?.value ? (JSON.parse(userCookie.value) as User) : undefined;
  const accessToken = accessTokenCookie?.value || undefined;
  const refreshToken = refreshTokenCookie?.value || undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
}

export async function deleteSessionCookies() {
  const cookiesStore = await cookies();

  cookiesStore.delete(COOKIES_KEYS.User);
  cookiesStore.delete(COOKIES_KEYS.AccessToken);
  cookiesStore.delete(COOKIES_KEYS.RefreshToken);
}

export async function updateAccessToken(token: string) {
  const cookiesStore = await cookies();

  cookiesStore.set(COOKIES_KEYS.AccessToken, token, {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
    secure: true,
  });
}
