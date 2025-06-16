import { Theme, Components } from '@mui/material';

export function tooltip(theme: Theme): { MuiTooltip: Components['MuiTooltip'] } {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ ownerState }) => ({
          ...(ownerState.color === 'default' || !ownerState.color
            ? { backgroundColor: '#000' }
            : {
                backgroundColor: theme.palette[ownerState.color as 'primary' | 'secondary'].main,
                color: theme.palette[ownerState.color as 'primary' | 'secondary'].contrastText,
              }),
        }),
        arrow: ({ ownerState }) => ({
          ...(ownerState.color === 'default' || !ownerState.color
            ? { color: '#000' }
            : { color: theme.palette[ownerState.color as 'primary' | 'secondary'].main }),
        }),
      },
    },
  };
}
