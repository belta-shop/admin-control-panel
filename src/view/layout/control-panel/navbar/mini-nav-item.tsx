'use client';

import { Tooltip, ListItem } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { ListItemIcon, ListItemButton } from '@mui/material';
import { alpha, styled, listItemIconClasses, listItemButtonClasses } from '@mui/material';

import { Iconify } from '@/view/components/iconify';
import { useRouter, usePathname } from '@/lib/i18n/navigation';

import { isActive } from './is-active';

interface Props {
  label: string;
  href: string;
  icon: string;
}

export default function MiniNavItem({ label, href, icon }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selected = isActive(href, `${pathname}?${searchParams.toString()}`);

  return (
    <ListItem disablePadding>
      <Tooltip title={label} placement="right" arrow>
        <StyledListItemButton
          onClick={() => router.push(href)}
          selected={selected}
          aria-selected={selected}
          aria-current={selected ? 'page' : undefined}
        >
          <ListItemIcon>
            <Iconify icon={icon} fontSize={24} />
          </ListItemIcon>
        </StyledListItemButton>
      </Tooltip>
    </ListItem>
  );
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  aspectRatio: '5/4',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  [`& .${listItemIconClasses.root}`]: {
    color: theme.palette.text.primary,
  },
  [`&.${listItemButtonClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    [`& .${listItemIconClasses.root}`]: {
      color: theme.palette.primary.contrastText,
    },
  },
}));
