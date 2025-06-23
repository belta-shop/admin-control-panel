'use client';

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { IconButton, ListItemButton } from '@mui/material';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { LocaleType } from '@/lib/types/locale';
import { localesSettings } from '@/lib/config/locale';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';
import { redirect, usePathname } from '@/lib/i18n/navigation';

import { Iconify } from '../iconify';
import CustomPopover from './custom-popover';
import { usePopover } from './custom-popover/hooks';

export default function LocalePopover({ large = false }: { large?: boolean }) {
  const { isOpen, handleOpen, handleClose, popoverProps } = usePopover();

  const currentLocale = useCurrentLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangeLang = useCallback(
    (newLocale: LocaleType) => {
      if (currentLocale.value !== newLocale) {
        const path = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        redirect({ href: path, locale: newLocale });
      }
      handleClose();
    },
    [currentLocale.value, handleClose, pathname, searchParams]
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

      <CustomPopover anchorOrigin="bottom-center" transformOrigin="top-center" {...popoverProps}>
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
      </CustomPopover>
    </>
  );
}
