import { Theme, Components } from '@mui/material';

export function container(_theme: Theme): { MuiContainer: Components['MuiContainer'] } {
  return {
    MuiContainer: {
      defaultProps: { maxWidth: 'xl' },
    },
  };
}
