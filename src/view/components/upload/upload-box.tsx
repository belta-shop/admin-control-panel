'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, FormHelperText } from '@mui/material';

import { fSize } from '@/lib/utils/format';
import { MAX_FILE_SIZE } from '@/lib/config/upload';
import { FileType, FileVariant } from '@/lib/types/upload';

import { UploadBoxWrapper } from './styles';
import SimplePlaceholder from '../placeholder/simple';
import { getVariantFileTypes, getVariantUploadIcon } from './utils';

type UploadBoxProps = {
  file?: File | string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onDrop: (acceptedFiles: File[]) => void;
  icon?: string;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function UploadBox({
  file,
  error,
  helperText,
  disabled,
  maxSize = MAX_FILE_SIZE,
  onDrop,
  icon,
  ...props
}: UploadBoxProps) {
  const t = useTranslations('Global.Helper');

  const acceptedTypes =
    'acceptedTypes' in props
      ? props.acceptedTypes
      : 'variant' in props && props.variant
      ? getVariantFileTypes(props.variant)
      : undefined;

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
    accept: acceptedTypes
      ? acceptedTypes
          .map((type) => type.mime)
          .reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {} as Record<string, string[]>)
      : undefined,
  });

  const errorMessage = useMemo(() => {
    if (fileRejections.length === 0) return null;

    const rejection = fileRejections[0];
    switch (rejection.errors[0]?.code) {
      case 'file-too-large':
        return t('upload_file_size_error', {
          current: fSize(rejection.file.size),
          max: fSize(maxSize || 0),
        });
      case 'file-invalid-type':
        const acceptedExtensions = acceptedTypes ? acceptedTypes.map((type) => type.extension) : [];
        return t('upload_file_type_error', {
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
      return t('upload_accepted_types', { types: acceptedExtensions.join(', ') });
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

        <Preview file={file} />

        {!file && (
          <SimplePlaceholder
            icon={
              icon ??
              getVariantUploadIcon('variant' in props && props.variant ? props.variant : 'all')
            }
            text={isDragActive ? t('upload_drop_here_file') : t('upload_drag_drop_file')}
          />
        )}
      </UploadBoxWrapper>

      {renderHelperText && (
        <FormHelperText
          error={!!hasError}
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

function Preview({ file }: { file?: File | string }) {
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
}
