import { BoxProps } from '@mui/material';

import ImageLink from './image-link';
import BrokenImage from './broken-image';

interface Props extends Omit<BoxProps, 'children'> {
  src: string;
}

export default function CustomImage({
  src,
  width = 50,
  height = 50,
  borderRadius = 5,
  sx,
  ...props
}: Props) {
  return (
    <ImageLink
      href={src}
      sx={{ display: 'inline-block', width, height, borderRadius: `${borderRadius}px`, ...sx }}
      {...props}
    >
      <BrokenImage sx={{ width: '100%', height: '100%', borderRadius: 'inherit' }} src={src} />
    </ImageLink>
  );
}
