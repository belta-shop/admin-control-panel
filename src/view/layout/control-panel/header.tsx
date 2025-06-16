'use client';

import { useMediaQuery } from '@mui/material';
import { Box, AppBar, Toolbar } from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import LanguagePopover from '@/view/components/locale-popover';
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
          bgcolor: 'background.default',
          backdropFilter: 'blur(50px)',
          height: HEADER_HEIGHT,
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
