import Link from 'next/link';
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
  href?: string;
}

export default function Logo({
  full = false,
  scale = 1,
  href,
  ...props
}: Props & Omit<BoxProps, 'component'>) {
  const img = full ? logo(scale).full : logo(scale).icon;

  return (
    <Box {...(href ? { component: Link, href } : {})} {...props}>
      <Image alt="logo" {...img} style={{ maxWidth: '100%' }} />
    </Box>
  );
}
