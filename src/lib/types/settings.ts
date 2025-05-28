import { PaletteMode } from '@mui/material';

export interface SettingsState {
  themeMode: PaletteMode;
  drawer: 'mini' | 'full';
}

export interface SettingsReducers {
  setThemeMode: (theme: SettingsState['themeMode']) => void;
  toggleThemeMode: VoidFunction;

  setDrawer: (drawer: SettingsState['drawer']) => void;
  toggleDrawer: VoidFunction;
}

export type SettingsStore = SettingsState & SettingsReducers;
