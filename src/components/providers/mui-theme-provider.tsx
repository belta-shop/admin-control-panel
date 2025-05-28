'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import { createPalette } from '@/lib/config/theme/palette';
import { typography } from '@/lib/config/theme/typography';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useSettingsStore(({ themeMode }) => themeMode);

  const theme = createTheme({
    palette: createPalette(themeMode),
    typography,
  });

  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
