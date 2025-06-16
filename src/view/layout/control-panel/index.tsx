'use client';

import { Box } from '@mui/material';

import { useSettingsStore } from '@/lib/store/settings';
import { NAVBAR_WIDTH, HEADER_HEIGHT } from '@/lib/config/theme/layout';

import Navbar from './navbar';
import ControlPanelHeader from './header';

export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {
  const { navbarType } = useSettingsStore();

  return (
    <Box>
      <ControlPanelHeader />

      <Navbar />

      <Box
        sx={{
          left: { md: NAVBAR_WIDTH[navbarType] },
          width: { md: `calc(100% - ${NAVBAR_WIDTH[navbarType]}px)` },
          top: HEADER_HEIGHT,
          position: 'relative',
          minHeight: `calc(100svh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
