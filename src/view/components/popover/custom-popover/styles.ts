import { PopoverProps } from '@mui/material';

export type PopoverDirection =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export const getPopoverPosition = (direction: PopoverDirection): PopoverProps['anchorOrigin'] => {
  const dirs = direction.split('-');

  if (['top', 'bottom'].includes(dirs[0])) {
    return {
      vertical: dirs[0] as 'top' | 'bottom',
      horizontal: dirs[1] as 'left' | 'right',
    };
  }

  return {
    vertical: dirs[1] as 'top' | 'bottom',
    horizontal: dirs[0] as 'left' | 'right',
  };
};
