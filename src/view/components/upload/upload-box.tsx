'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Box, alpha, Typography } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

interface UploadBoxProps {
  file?: File | string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
}

export default function UploadBox({
  file,
  error,
  helperText,
  disabled,
  maxSize,
  onDrop,
}: UploadBoxProps) {
  const t = useTranslations('Global.Helper');

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: onDropCallback,
    disabled,
    multiple: false,
    maxSize,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const renderPreview = () => {
    if (!file) return null;

    if (typeof file === 'string' && file.trim()) {
      return (
        <Box
          component="img"
          alt="preview"
          src={file}
          sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      );
    }

    if (file instanceof File) {
      return (
        <Box
          component="img"
          alt="preview"
          src={URL.createObjectURL(file)}
          sx={{
            width: 1,
            height: 1,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      );
    }

    return null;
  };

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
          {t('upload_file_size_error', {
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
          height: 200,
          cursor: disabled ? 'default' : 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) =>
            hasError ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.grey[500], 0.08),
          border: (theme) =>
            `1px dashed ${
              hasError ? theme.palette.error.main : alpha(theme.palette.grey[500], 0.2)
            }`,
          borderRadius: 1,
          '&:hover': {
            opacity: 0.72,
          },
        }}
      >
        <input {...getInputProps()} />

        {renderPreview()}

        {!file && (
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
              {isDragActive ? t('upload_drop_here_file') : t('upload_drag_drop_file')}
            </Typography>
          </Box>
        )}
      </Box>

      {renderFileSizeError()}

      {helperText && (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: hasError ? 'error.main' : 'text.secondary',
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
