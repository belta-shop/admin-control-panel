import { Theme, Components } from '@mui/material';

export function button(_theme: Theme): { MuiButton: Components['MuiButton'] } {
  const inheritStyles = {
    contained: {
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(33, 43, 54)',
      '&:hover': {
        backgroundColor: 'rgb(69, 79, 91)',
      },
    },
    outlined: {
      borderColor: 'rgba(145, 158, 171, 0.32)',
      color: 'rgb(33, 43, 54)',
      '&:hover': {
        backgroundColor: 'rgba(33, 43, 54, 0.08)',
        boxShadow: 'currentcolor 0px 0px 0px 0.5px',
        borderColor: 'currentColor',
      },
    },
    text: {},
  };

  return {
    MuiButton: {
      defaultProps: { color: 'inherit' },
      styleOverrides: {
        root: ({ ownerState }) => ({
          display: 'flex',
          ...(ownerState.color === 'inherit'
            ? inheritStyles[ownerState.variant || 'text']
            : undefined),
        }),
      },
    },
  };
}
