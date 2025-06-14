'use client';

import { useEffect, useCallback } from 'react';

import { useAuthStore } from '@/lib/store/auth';
import { deleteSessionCookies } from '@/lib/actions/auth';
import { fetchUserByToken, saveSessionCookies } from '@/lib/actions/auth';

export default function Page() {
  const init = useAuthStore((state) => state.init);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const refreshToken = useCallback(async () => {
    const data = await fetchUserByToken();
    if ('error' in data) {
      init(null);
      await deleteSessionCookies();
      return;
    }

    const {
      accessToken: _,
      accessTokenExpireDate,
      refreshToken: __,
      refreshTokenExpireDate: ___,
      ...user
    } = data;

    const expireDate = new Date(accessTokenExpireDate);
    const timeUntilExpiry = expireDate.getTime() - Date.now() - 60000; // 1 minute before expiry

    setTimeout(() => {
      refreshToken();
    }, timeUntilExpiry);

    await saveSessionCookies(data);
    init(user);
  }, [init]);

  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        refreshToken();
      }, 10 * 60 * 1000); // 10 minutes

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, refreshToken]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refreshToken();
    });

    return () => clearTimeout(timeoutId);
  }, [refreshToken]);

  return null;
}
