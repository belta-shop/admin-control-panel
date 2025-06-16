import { Theme, Components } from '@mui/material';

export function stack(_theme: Theme): { MuiStack: Components['MuiStack'] } {
  return {
    MuiStack: {
      defaultProps: { useFlexGap: true },
    },
  };
}
