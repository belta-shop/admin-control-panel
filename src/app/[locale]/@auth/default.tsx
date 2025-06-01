'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/lib/store/auth';
import { LoginResponse } from '@/lib/types/auth';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { restoreSessionCookies } from '@/lib/actions/auth';
import { saveSessionCookies, deleteSessionCookies } from '@/lib/actions/auth';

export default function Page() {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    const initializeAuth = async () => {
      const { user, refreshToken } = await restoreSessionCookies();

      if (!user || !refreshToken) {
        init(null);
        await deleteSessionCookies();
        return;
      }

      try {
        const res = await axiosInstance.post(endpoints.auth.refresh, { token: refreshToken });

        const loginResponse = res.data as LoginResponse;

        await saveSessionCookies(loginResponse);

        const { accessTokenExpireDate } = loginResponse;

        // Set timeout to refresh token before it expires
        const expireDate = new Date(accessTokenExpireDate);
        const timeUntilExpiry = expireDate.getTime() - Date.now() - 60000; // 1 minute before expiry

        setTimeout(() => {
          initializeAuth();
        }, timeUntilExpiry);

        init(user);
      } catch (ignoreError) {
        init(null);
        await deleteSessionCookies();
      }
    };

    initializeAuth();
  }, [init]);

  return null;
}
