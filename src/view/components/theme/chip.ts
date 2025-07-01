import { Theme, Components } from '@mui/material';

export function chip(theme: Theme): { MuiChip: Components['MuiChip'] } {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor:
            ownerState.color && ownerState.color !== 'default'
              ? theme.palette[ownerState.color].light
              : undefined,
        }),
      },
    },
  };
}
