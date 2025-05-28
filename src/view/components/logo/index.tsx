import Image from 'next/image';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/material';

const logo = (scale: number) => ({
  icon: {
    src: '/assets/logo/logo-icon.svg',
    width: 40 * scale,
    height: 40 * scale,
  },
  full: {
    src: '/assets/logo/logo-full.svg',
    width: 300 * scale,
    height: 60 * scale,
  },
});

interface Props {
  full?: boolean;
  scale?: number;
}

export default function Logo({ full = false, scale = 1, ...props }: Props & BoxProps) {
  const img = full ? logo(scale).full : logo(scale).icon;

  return (
    <Box {...props}>
      <Image alt="logo" {...img} style={{ maxWidth: '100%' }} />
    </Box>
  );
}
