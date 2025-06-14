'use client';

import { Box, AppBar, Toolbar } from '@mui/material';

import SearchField from '@/view/components/search-field';
import { HEADER_HEIGHT } from '@/lib/config/theme/layout';
import LanguagePopover from '@/view/components/locale-popover';

export default function ControlPanelHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: '#ffffff4d',
          backdropFilter: 'blur(50px)',
          height: HEADER_HEIGHT,
          overflow: 'hidden',
          display: 'grid',
          alignItems: 'center',
        }}
        elevation={1}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <LanguagePopover />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
