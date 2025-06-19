import { Box, alpha, BoxProps } from '@mui/material';

export function UploadBoxWrapper({
  disabled,
  error,
  dragActive,
  sx,
  ...props
}: {
  disabled?: boolean;
  error?: boolean;
  dragActive?: boolean;
} & BoxProps) {
  return (
    <Box
      sx={{
        height: 200,
        cursor: disabled ? 'default' : 'pointer',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: (theme) =>
          error ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.grey[500], 0.08),
        border: (theme) =>
          `1px dashed ${error ? theme.palette.error.main : alpha(theme.palette.grey[500], 0.2)}`,
        borderRadius: 1,
        '&:hover': {
          opacity: 0.72,
        },
        ...(dragActive && {
          opacity: 0.72,
        }),
        ...sx,
      }}
      {...props}
    />
  );
}
