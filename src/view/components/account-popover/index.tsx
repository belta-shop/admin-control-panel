'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Popover, Divider, IconButton, ListItemButton } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { paths } from '@/lib/config/paths';
import { useAuthStore } from '@/lib/store/auth';

import { Iconify } from '../iconify';

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0.5,
          ...(isOpen && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={Icons.PROFILE} fontSize={28} />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id="account-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <PopoverContent />
      </Popover>
    </>
  );
}

function PopoverContent() {
  const t = useTranslations();
  const { user, logout } = useAuthStore();

  const renderUserInfo = (
    <ListItem>
      <ListItemText primary={user?.fullName} secondary={user?.email} />
    </ListItem>
  );

  const renderLogout = (
    <ListItem disablePadding>
      <ListItemButton onClick={logout}>
        <ListItemIcon sx={{ color: 'error.main' }}>
          <Iconify icon={Icons.LOGOUT} sx={{ borderRadius: 0.65, width: 28 }} />
        </ListItemIcon>

        <ListItemText sx={{ color: 'error.main' }}>{t('Global.Action.logout')}</ListItemText>
      </ListItemButton>
    </ListItem>
  );

  return (
    <>
      {renderUserInfo}

      <Divider />

      {menuItems.map((option, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            {...('href' in option ? { href: option.href } : { onClick: option.onClick })}
          >
            <ListItemIcon>
              <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
            </ListItemIcon>

            <ListItemText>{t(option.label)}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}

      <Divider />

      {renderLogout}
    </>
  );
}

type MenuItem = {
  label: string;
  icon: string;
  color?: string;
} & ({ onClick: () => void } | { href: string });

const menuItems: MenuItem[] = [
  {
    label: 'Global.Action.reset_password',
    icon: Icons.LOCK,
    href: paths.auth.resetPassword,
  },
];
