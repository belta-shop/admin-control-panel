import { Popover, PopoverProps } from '@mui/material';

import { PopoverDirection, getPopoverPosition } from './styles';

export default function CustomPopover({
  anchorOrigin = 'top-center',
  transformOrigin = 'top-center',
  ...props
}: Omit<PopoverProps, 'keepMounted' | 'anchorOrigin' | 'transformOrigin'> & {
  anchorOrigin?: PopoverDirection;
  transformOrigin?: PopoverDirection;
}) {
  return (
    <Popover
      anchorOrigin={getPopoverPosition(anchorOrigin)}
      transformOrigin={getPopoverPosition(transformOrigin)}
      keepMounted
      {...props}
    />
  );
}
