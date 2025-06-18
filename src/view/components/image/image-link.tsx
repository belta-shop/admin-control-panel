'use client';

import Link from 'next/link';
import { Box, BoxProps } from '@mui/material';

interface ImageLinkProps extends BoxProps {
  href: string;
}

export default function ImageLink({ href, children, sx, ...props }: ImageLinkProps) {
  return (
    <Box
      href={href}
      target="_blank"
      component={Link}
      sx={{
        textDecoration: 'none',
        display: 'block',
        width: 'fit-content',
        '&:hover': {
          opacity: 0.8,
        },
        '&:focus': {
          opacity: 0.9,
        },
        transition: (theme) => `opacity ${theme.transitions.duration.short}ms`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
