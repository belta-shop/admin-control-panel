import { Components, PaletteMode } from '@mui/material';

export function popover(_mode: PaletteMode): Components['MuiPopover'] {
  return {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 2,
        },
      },
    },
  };
}
