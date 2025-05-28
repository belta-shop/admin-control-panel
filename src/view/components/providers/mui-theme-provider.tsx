'use client';

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
import { shadows as customShadows } from '@/lib/config/theme/shadow';

import themeComponents from '../theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useSettingsStore(({ themeMode }) => themeMode);

  const theme = createTheme({
    palette: createPalette(themeMode),
    typography,
    components: themeComponents(themeMode),
  });

  theme.shadows = theme.shadows.map((defaultShadow, i) =>
    customShadows[i] ? customShadows[i] : defaultShadow
  ) as Shadows;

  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
