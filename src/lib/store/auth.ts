import { create } from 'zustand';

import { axiosInstance } from '../utils/axios';
import { endpoints } from '../config/endpoints';
import { SaveSessionCookies } from '../actions/auth';
import { AuthState, AuthStore, LoginPayload, LoginResponse } from '../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>()((set) => ({
  ...initialState,
  login: async (payload: LoginPayload) => {
    try {
      const res = await axiosInstance.post(endpoints.auth.login, payload);

      const loginResponse = res.data as LoginResponse;

      await SaveSessionCookies(loginResponse);

      const { accessToken, accessTokenExpireDate, refreshToken, refreshTokenExpireDate, ...user } =
        loginResponse;

      set({ isLoading: false, isAuthenticated: true, user });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
