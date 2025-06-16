'use client';

import { merge } from 'lodash';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {
  Shadows,
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import { createPalette } from '@/lib/config/theme/palette';
import { typography } from '@/lib/config/theme/typography';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';
import { shadows as customShadows } from '@/lib/config/theme/shadow';

import themeComponents from '../theme';
import CustomSnackbarProvider from './snackbar-provider';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { dir } = useCurrentLocale();

  const themeMode = useSettingsStore(({ themeMode }) => themeMode);

  const theme = createTheme({
    palette: createPalette(themeMode),
    typography,
  });
  theme.components = merge(theme.components, themeComponents(theme));

  theme.shadows = theme.shadows.map((defaultShadow, i) =>
    customShadows[i] ? customShadows[i] : defaultShadow
  ) as Shadows;

  return (
    <AppRouterCacheProvider
      options={{ key: 'css', stylisPlugins: dir === 'rtl' ? [stylisRTLPlugin] : [] }}
    >
      <MuiThemeProvider theme={theme}>
        <CustomSnackbarProvider>
          <CssBaseline />
          {children}
        </CustomSnackbarProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
