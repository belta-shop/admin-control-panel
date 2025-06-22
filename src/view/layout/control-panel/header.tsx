'use client';

import { useTranslations } from 'next-intl';
import { Box, AppBar, Toolbar } from '@mui/material';
import { alpha, Button, useMediaQuery } from '@mui/material';

import { useAuthStore } from '@/lib/store/auth';
import { useSettingsStore } from '@/lib/store/settings';
import LanguagePopover from '@/view/components/locale-popover';
import { NAVBAR_WIDTH, HEADER_HEIGHT } from '@/lib/config/theme/layout';

import DrawerToggler from './navbar/drawer-toggler';
export default function ControlPanelHeader() {
  const t = useTranslations();
  const { navbarType } = useSettingsStore();

  const notMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { logout } = useAuthStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
          backdropFilter: 'blur(10px)',
          height: `${HEADER_HEIGHT}px`,
          overflow: 'hidden',
          display: 'grid',
          alignItems: 'center',
          zIndex: 900,
          width: { md: `calc(100% - ${NAVBAR_WIDTH[navbarType]}px)` },
          right: 0,
        }}
        elevation={0}
      >
        <Toolbar>
          {notMd && <DrawerToggler />}

          <Box sx={{ flexGrow: 1 }} />

          <LanguagePopover />
          <Button variant="outlined" color="error" size="small" sx={{ ml: 0.5 }} onClick={logout}>
            {t('Global.Action.logout')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
