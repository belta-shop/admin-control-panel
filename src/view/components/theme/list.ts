import { Theme, Components } from '@mui/material';

interface Props {
  MuiListItem?: Components['MuiListItem'];
  MuiListItemButton?: Components['MuiListItemButton'];
  MuiListItemIcon?: Components['MuiListItemIcon'];
  MuiListItemText?: Components['MuiListItemText'];
}

export function list(_theme: Theme): Props {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          '& > *': {
            width: 24,
            fontSize: 24,
          },
        },
      },
    },
  };
}
