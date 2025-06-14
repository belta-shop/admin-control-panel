import { Box } from '@mui/material';

import ControlPanelHeader from './header';

export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <ControlPanelHeader />
      <Box>{children}</Box>
    </Box>
  );
}
