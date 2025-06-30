'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Box, alpha, Stack, Button, IconButton, FormHelperText } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { fSize } from '@/lib/utils/format';
import { MAX_FILE_SIZE } from '@/lib/config/upload';
import { FileType, FileVariant } from '@/lib/types/upload';

import { Iconify } from '../iconify';
import { UploadBoxWrapper } from './styles';
import SimplePlaceholder from '../placeholder/simple';
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
  onReorder?: (newFiles: (File | string)[]) => void;
  icon?: string;
  draggable?: boolean;
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
  onReorder,
  icon,
  draggable = false,
  ...props
}: UploadMultiBoxProps) {
  const t = useTranslations();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!draggable) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!draggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (!draggable || draggedIndex === null) return;
    e.preventDefault();

    if (draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);

    onReorder?.(newFiles);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

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

        <SimplePlaceholder
          icon={
            icon ??
            getVariantUploadIcon('variant' in props && props.variant ? props.variant : 'all')
          }
          text={
            isDragActive
              ? t('Global.Helper.upload_drop_here_files')
              : t('Global.Helper.upload_drag_drop_files')
          }
        />
      </UploadBoxWrapper>

      {!!files.length && (
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
          {files.map((file, index) => (
            <Preview
              key={index}
              file={file}
              index={index}
              onRemove={() => onRemove(index)}
              draggable={draggable}
              isDragging={draggedIndex === index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            />
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

function Preview({
  file,
  index,
  onRemove,
  draggable,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  file: File | string;
  index: number;
  onRemove: () => void;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}) {
  const isString = typeof file === 'string';
  const preview = isString ? file : URL.createObjectURL(file);

  return (
    <Box
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      sx={{
        position: 'relative',
        width: 100,
        height: 100,
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.24)}`,
        cursor: draggable ? 'grab' : 'default',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.2s ease',
        '&:active': {
          cursor: draggable ? 'grabbing' : 'default',
        },
        '&:hover': {
          transform: draggable ? 'scale(1.02)' : 'scale(1)',
        },
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
          pointerEvents: 'none', // Prevent image drag
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
      {draggable && (
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            left: 4,
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            color: 'common.white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
          }}
        >
          ⋮⋮
        </Box>
      )}
    </Box>
  );
}
