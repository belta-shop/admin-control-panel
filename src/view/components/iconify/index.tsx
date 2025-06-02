import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';

export function Iconify({ icon, ...props }: BoxProps & { icon: string }) {
  return <Box component={Icon} icon={icon} {...props} />;
}
