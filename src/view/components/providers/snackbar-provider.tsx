'use client';

import { styled, useTheme } from '@mui/material';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';

import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

export default function CustomSnackbarProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { dir } = useCurrentLocale();

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: theme.palette.info.main,
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
    >
      {children}
    </SnackbarProvider>
  );
}
