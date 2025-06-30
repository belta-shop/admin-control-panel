import { Box, BoxProps, Typography } from '@mui/material';

import { Iconify } from '../iconify';

export default function SimplePlaceholder({
  icon,
  text,
  sx,
  ...props
}: { icon: string; text: string } & BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 1,
        ...sx,
      }}
      {...props}
    >
      <Iconify icon={icon} fontSize={64} />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {text}
      </Typography>
    </Box>
  );
}
