import { Box, alpha, styled } from '@mui/material';

export const UploadBoxWrapper = styled(Box)<{
  disabled?: boolean;
  error?: boolean;
  dragActive?: boolean;
}>(({ theme, disabled, error, dragActive }) => ({
  height: 200,
  cursor: disabled ? 'default' : 'pointer',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: error
    ? alpha(theme.palette.error.main, 0.1)
    : alpha(theme.palette.grey[500], 0.08),
  border: `1px dashed ${error ? theme.palette.error.main : alpha(theme.palette.grey[500], 0.2)}`,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    opacity: 0.72,
  },
  ...(dragActive && {
    opacity: 0.72,
  }),
}));
