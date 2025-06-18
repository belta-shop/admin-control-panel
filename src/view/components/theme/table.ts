import { Theme, Components, tableCellClasses } from '@mui/material';

interface Props {
  MuiTableContainer?: Components['MuiTableContainer'];
  MuiTable?: Components['MuiTable'];
  MuiTableHead?: Components['MuiTableHead'];
  MuiTableBody?: Components['MuiTableBody'];
  MuiTableFooter?: Components['MuiTableFooter'];
  MuiTableRow?: Components['MuiTableRow'];
  MuiTableCell?: Components['MuiTableCell'];
  MuiTablePagination?: Components['MuiTablePagination'];
}

export function table(theme: Theme): Props {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: 'none' },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f4f6f8',
          [`& .${tableCellClasses.root}`]: { color: theme.palette.text.secondary },
        },
      },
    },
  };
}
