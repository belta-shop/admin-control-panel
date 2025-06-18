import { Avatar, AvatarProps } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

export default function BrokenImage(props: Omit<AvatarProps, 'children'>) {
  return (
    <Avatar {...props}>
      <Iconify icon={Icons.BROKEN_IMAGE} />
    </Avatar>
  );
}
