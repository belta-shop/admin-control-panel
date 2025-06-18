import { Theme, Components } from '@mui/material';

export function breadcrumbs(_theme: Theme): { MuiBreadcrumbs: Components['MuiBreadcrumbs'] } {
  return {
    MuiBreadcrumbs: {
      defaultProps: {
        separator: '•',
      },
      styleOverrides: {},
    },
  };
}
