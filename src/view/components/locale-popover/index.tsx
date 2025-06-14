'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Popover, IconButton, ListItemButton } from '@mui/material';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { LocaleType } from '@/lib/types/locale';
import { localesSettings } from '@/lib/config/locale';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';
import { redirect, usePathname } from '@/lib/i18n/navigation';

import { Iconify } from '../iconify';

export default function LanguagePopover({ large = false }: { large?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLocale = useCurrentLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleChangeLang = useCallback(
    (newLocale: LocaleType) => {
      if (currentLocale.value !== newLocale) {
        const path = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        redirect({ href: path, locale: newLocale });
      }
      setAnchorEl(null);
    },
    [currentLocale.value, pathname, searchParams]
  );

  return (
    <>
      {large ? (
        <Button
          onClick={handleOpen}
          sx={{
            ...(isOpen && {
              bgcolor: 'action.selected',
            }),
          }}
          startIcon={<Iconify icon={currentLocale.icon} sx={{ borderRadius: 0.65, width: 28 }} />}
        >
          {currentLocale.label}
        </Button>
      ) : (
        <IconButton
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            ...(isOpen && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Iconify icon={currentLocale.icon} sx={{ borderRadius: 0.65, width: 28 }} />
        </IconButton>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id="language-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        {Object.values(localesSettings).map((option) => (
          <ListItem key={option.value} disablePadding>
            <ListItemButton
              selected={option.value === currentLocale.value}
              onClick={() => handleChangeLang(option.value)}
            >
              <ListItemIcon>
                <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
              </ListItemIcon>

              <ListItemText>{option.label}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </Popover>
    </>
  );
}
