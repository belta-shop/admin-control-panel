'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Box, alpha, Stack, Button, Typography, IconButton } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

export interface UploadMultiBoxProps {
  files: (File | string)[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
}

export default function UploadMultiBox({
  files,
  error,
  helperText,
  disabled,
  maxSize,
  onDrop,
  onRemove,
  onRemoveAll,
}: UploadMultiBoxProps) {
  const t = useTranslations();

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    multiple: true,
    disabled,
    maxSize,
    onDrop,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const renderPreview = useCallback(
    (file: File | string, index: number) => {
      const isString = typeof file === 'string';
      const preview = isString ? file : URL.createObjectURL(file);

      return (
        <Box
          key={index}
          sx={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: 1,
            overflow: 'hidden',
            border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.24)}`,
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            size="small"
            onClick={() => onRemove(index)}
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
              color: 'common.white',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }}
          >
            <Iconify icon={Icons.XMARK} />
          </IconButton>
        </Box>
      );
    },
    [onRemove]
  );

  const renderFileSizeError = () => {
    if (fileRejections.length === 0) return null;

    const rejection = fileRejections[0];
    if (rejection.errors[0]?.code === 'file-too-large') {
      return (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: 'error.main',
          }}
        >
          {t('Global.Helper.upload_file_size_error', {
            current: formatFileSize(rejection.file.size),
            max: formatFileSize(maxSize || 0),
          })}
        </Typography>
      );
    }

    return null;
  };

  const hasError = error || fileRejections.length > 0;

  return (
    <Box sx={{ width: 1, position: 'relative' }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 3,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) =>
            hasError ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.grey[500], 0.08),
          border: (theme) =>
            `1px dashed ${
              hasError ? theme.palette.error.main : alpha(theme.palette.grey[500], 0.2)
            }`,
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
        }}
      >
        <input {...getInputProps()} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 1,
          }}
        >
          <Iconify icon={Icons.UPLOAD} fontSize={64} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {isDragActive
              ? t('Global.Helper.upload_drop_here_files')
              : t('Global.Helper.upload_drag_drop_files')}
          </Typography>
        </Box>
      </Box>

      {!!files.length && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {files.map((file, index) => renderPreview(file, index))}
        </Stack>
      )}

      {!!files.length && (
        <Button
          variant="outlined"
          color="error"
          onClick={onRemoveAll}
          startIcon={<Iconify icon={Icons.TRASH} />}
          sx={{ mt: 1, ml: 'auto' }}
        >
          {t('Global.Action.clear_all')}
        </Button>
      )}

      {renderFileSizeError()}

      {helperText && (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            color: hasError ? 'error.main' : 'text.secondary',
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
