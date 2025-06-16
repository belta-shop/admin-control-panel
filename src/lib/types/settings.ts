import { PaletteMode } from '@mui/material';

export const enum NavbarType {
  MINI = 'mini',
  FULL = 'full',
}

export interface SettingsState {
  themeMode: PaletteMode;
  isDrawerOpen: boolean;
  navbarType: NavbarType;
}

export interface SettingsReducers {
  setThemeMode: (theme: SettingsState['themeMode']) => void;
  toggleThemeMode: VoidFunction;

  setDrawer: (open: boolean) => void;
  setNavbarType: (type: SettingsState['navbarType']) => void;
}

export type SettingsStore = SettingsState & SettingsReducers;
