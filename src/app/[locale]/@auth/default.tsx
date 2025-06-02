'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/lib/store/auth';
import { deleteSessionCookies } from '@/lib/actions/auth';
import { fetchUserByToken, saveSessionCookies } from '@/lib/actions/auth';

export default function Page() {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    const initializeAuth = async () => {
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

      await saveSessionCookies(data);

      const expireDate = new Date(accessTokenExpireDate);
      const timeUntilExpiry = expireDate.getTime() - Date.now() - 60000; // 1 minute before expiry

      setTimeout(() => {
        initializeAuth();
      }, timeUntilExpiry);

      init(user);
    };

    initializeAuth();
  }, [init]);

  return null;
}
