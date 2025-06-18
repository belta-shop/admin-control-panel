'use client';

import { styled, useTheme, IconButton } from '@mui/material';
import { closeSnackbar, SnackbarProvider, MaterialDesignContent } from 'notistack';

import { Icons } from '@/lib/config/icons';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

import { Iconify } from '../iconify';

export default function CustomSnackbarProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { dir } = useCurrentLocale();

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.contrastText,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText,
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.contrastText,
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.info.contrastText,
    },
  }));

  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: dir === 'rtl' ? 'left' : 'right' }}
      Components={{
        success: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        default: StyledMaterialDesignContent,
      }}
      variant="success"
      action={(key) => (
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <Iconify icon={Icons.XMARK} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
