import { create } from 'zustand';

import { SettingsState, SettingsStore } from '../types/settings';

const initialState: SettingsState = {
  themeMode: 'light',
  drawer: 'full',
};

export const useSettingsStore = create<SettingsStore>()((set, get) => ({
  ...initialState,

  setThemeMode: (themeMode) => set({ themeMode }),
  toggleThemeMode: () => set({ themeMode: get().themeMode === 'light' ? 'dark' : 'light' }),

  setDrawer: (drawer) => set({ drawer }),
  toggleDrawer: () => set({ drawer: get().drawer === 'full' ? 'mini' : 'full' }),
}));
