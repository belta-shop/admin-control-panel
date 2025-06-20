'use client';

import { Box } from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import { NAVBAR_WIDTH, HEADER_HEIGHT } from '@/lib/config/theme/layout';

import Navbar from './navbar';
import ControlPanelHeader from './header';

export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {
  const { navbarType } = useSettingsStore();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <ControlPanelHeader />

      <Navbar />

      <Box
        sx={{
          ml: { xs: 0, md: `${NAVBAR_WIDTH[navbarType]}px` },
          width: { xs: '100%', md: `calc(100% - ${NAVBAR_WIDTH[navbarType]}px)` },
          mt: `${HEADER_HEIGHT}px`,
          minHeight: `calc(100svh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
