import { Popover, PopoverProps } from '@mui/material';

export default function CustomPopover({
  anchorOrigin,
  transformOrigin,
  ...props
}: Omit<PopoverProps, 'keepMounted'>) {
  return (
    <Popover
      anchorOrigin={
        anchorOrigin ?? {
          vertical: 'bottom',
          horizontal: 'right',
        }
      }
      keepMounted
      transformOrigin={
        transformOrigin ?? {
          vertical: 'top',
          horizontal: 'right',
        }
      }
      {...props}
    />
  );
}
