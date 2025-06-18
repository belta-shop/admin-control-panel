import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { ListItemIcon, ListItemText } from '@mui/material';
import { Popover, ListItem, IconButton, ListItemButton } from '@mui/material';

import { Iconify } from '../iconify';
import { SxStyle, SharedTableRowProps } from './types';

export default function CustomTableRow<T extends { id: string }>({
  row,
  actions,
  customRender,
  headIds,
}: SharedTableRowProps<T>) {
  const t = useTranslations();
  let rowStyle: SxStyle = {};

  if (Object.hasOwn(row, 'rowSx')) {
    rowStyle = (row as any).rowSx as SxStyle;
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <TableRow hover sx={rowStyle}>
        {headIds.map((x, index) => (
          <TableCell key={index} sx={{ whiteSpace: 'nowrap' }}>
            {customRender && x in customRender ? customRender[x]!(row) : (row as any)[x]}
          </TableCell>
        ))}

        {!!actions?.length && (
          <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
            <IconButton color={isOpen ? 'inherit' : 'default'} onClick={handleOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        {actions
          ?.filter((action) => (action.hide ? !action.hide(row) : true))
          .map((action, index) => (
            <ListItem key={index} disablePadding sx={{ minWidth: 'min(130px, 90svw)' }}>
              <ListItemButton
                onClick={() => {
                  action.onClick(row);
                  handleClose();
                }}
                sx={action.sx}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 35 }}>{action.icon}</ListItemIcon>
                <ListItemText primary={t(action.label)} />
              </ListItemButton>
            </ListItem>
          ))}
      </Popover>
    </>
  );
}
