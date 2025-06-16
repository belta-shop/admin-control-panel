import { create } from 'zustand';

import { LOCAL_STORAGE_KEYS } from '../config/global';
import { NavbarType, SettingsState, SettingsStore } from '../types/settings';

const initialState: SettingsState = {
  themeMode: 'light',
  isDrawerOpen: false,
  navbarType: NavbarType.FULL,
};

export const useSettingsStore = create<SettingsStore>()((set, get) => ({
  ...initialState,

  setThemeMode: (themeMode) => set({ themeMode }),
  toggleThemeMode: () => set({ themeMode: get().themeMode === 'light' ? 'dark' : 'light' }),

  setDrawer: (isDrawerOpen) => set({ isDrawerOpen }),
  setNavbarType: (navbarType) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NavbarType, navbarType);
    set({ navbarType });
  },
}));
