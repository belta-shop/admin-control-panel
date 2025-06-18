'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Box, alpha, Stack, Button, Typography, IconButton, FormHelperText } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { fSize } from '@/lib/utils/format';
import { MAX_FILE_SIZE } from '@/lib/config/upload';
import { FileType, FileVariant } from '@/lib/types/upload';

import { Iconify } from '../iconify';
import { UploadBoxWrapper } from './styles';
import { getVariantFileTypes, getVariantUploadIcon } from './utils';

export type UploadMultiBoxProps = {
  files: (File | string)[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
  icon?: string;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function UploadMultiBox({
  files,
  error,
  helperText,
  disabled,
  maxSize = MAX_FILE_SIZE,
  onDrop,
  onRemove,
  onRemoveAll,
  icon,
  ...props
}: UploadMultiBoxProps) {
  const t = useTranslations();

  const acceptedTypes =
    'acceptedTypes' in props
      ? props.acceptedTypes
      : 'variant' in props && props.variant
      ? getVariantFileTypes(props.variant)
      : undefined;

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    multiple: true,
    disabled,
    maxSize,
    accept: acceptedTypes
      ? acceptedTypes
          .map((type) => type.mime)
          .reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {} as Record<string, string[]>)
      : undefined,
    onDrop,
  });

  const errorMessage = useMemo(() => {
    if (fileRejections.length === 0) return null;

    const rejection = fileRejections[0];

    switch (rejection.errors[0]?.code) {
      case 'file-too-large':
        return t('Global.Helper.upload_file_size_error', {
          current: fSize(rejection.file.size),
          max: fSize(maxSize || 0),
        });
      case 'file-invalid-type':
        const acceptedExtensions = acceptedTypes ? acceptedTypes.map((type) => type.extension) : [];
        return t('Global.Helper.upload_file_type_error', {
          accepted: acceptedExtensions.length > 0 ? acceptedExtensions.join(', ') : 'any',
        });
      default:
        return null;
    }
  }, [acceptedTypes, fileRejections, maxSize, t]);

  const hasError = error || fileRejections.length > 0;

  const renderHelperText = useMemo(() => {
    if (errorMessage) return errorMessage;
    if (helperText) return helperText;
    if (acceptedTypes && acceptedTypes.length > 0) {
      const acceptedExtensions = acceptedTypes.map((type) => type.extension);
      return t('Global.Helper.upload_accepted_types', { types: acceptedExtensions.join(', ') });
    }
    return undefined;
  }, [errorMessage, helperText, acceptedTypes, t]);

  return (
    <Box sx={{ width: 1, position: 'relative' }}>
      <UploadBoxWrapper
        disabled={disabled}
        error={hasError}
        dragActive={isDragActive}
        {...getRootProps()}
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
          <Iconify
            icon={
              icon ??
              getVariantUploadIcon('variant' in props && props.variant ? props.variant : 'all')
            }
            fontSize={64}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {isDragActive
              ? t('Global.Helper.upload_drop_here_files')
              : t('Global.Helper.upload_drag_drop_files')}
          </Typography>
        </Box>
      </UploadBoxWrapper>

      {!!files.length && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Preview key={index} file={file} onRemove={() => onRemove(index)} />
          ))}
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

      {renderHelperText && (
        <FormHelperText
          error={hasError}
          sx={{
            mt: 1,
          }}
        >
          {renderHelperText}
        </FormHelperText>
      )}
    </Box>
  );
}

function Preview({ file, onRemove }: { file: File | string; onRemove: () => void }) {
  const isString = typeof file === 'string';
  const preview = isString ? file : URL.createObjectURL(file);

  return (
    <Box
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
        onClick={() => onRemove()}
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
}
