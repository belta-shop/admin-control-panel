'use client';

import { merge } from 'lodash';
import { prefixer } from 'stylis';
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
    shape: { borderRadius: 8 },
    typography,
  });
  theme.components = merge(theme.components, themeComponents(theme));

  theme.shadows = theme.shadows.map((defaultShadow, i) =>
    customShadows[i] ? customShadows[i] : defaultShadow
  ) as Shadows;

  const renderContent = (
    <MuiThemeProvider theme={theme}>
      <CustomSnackbarProvider>
        <CssBaseline />
        {children}
      </CustomSnackbarProvider>
    </MuiThemeProvider>
  );

  if (dir === 'rtl') {
    return <RTLCacheProvider>{renderContent}</RTLCacheProvider>;
  }

  return <LTRCacheProvider>{renderContent}</LTRCacheProvider>;
}

function RTLCacheProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider
      options={{ key: 'css-rtl', stylisPlugins: [stylisRTLPlugin, prefixer] }}
    >
      {children}
    </AppRouterCacheProvider>
  );
}

function LTRCacheProvider({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider options={{ key: 'css-ltr' }}>{children}</AppRouterCacheProvider>;
}
