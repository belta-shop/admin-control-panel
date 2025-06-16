import { Theme, Components } from '@mui/material';

export function popover(_theme: Theme): { MuiPopover: Components['MuiPopover'] } {
  return {
    MuiPopover: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 2,
          },
        },
      },
    },
  };
}
