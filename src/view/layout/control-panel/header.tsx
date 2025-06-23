'use client';

import { Box, AppBar, Toolbar } from '@mui/material';
import { alpha, useMediaQuery } from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import LocalePopover from '@/view/components/popover/locale-popover';
import AccountPopover from '@/view/components/popover/account-popover';
import { NAVBAR_WIDTH, HEADER_HEIGHT } from '@/lib/config/theme/layout';

import DrawerToggler from './navbar/drawer-toggler';

export default function ControlPanelHeader() {
  const { navbarType } = useSettingsStore();

  const notMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

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

          <LocalePopover />

          <AccountPopover />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
