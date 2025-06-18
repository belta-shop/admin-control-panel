'use client';

import { Box, FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { FileType, FileVariant } from '@/lib/types/upload';

import UploadMultiBox from '../upload/upload-multi-box';

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
  icon?: string;
} & (
  | {
      acceptedTypes?: FileType[]; // e.g., ['image/png', 'application/pdf']
    }
  | { variant?: FileVariant }
);

export default function RHFUploadMulti({ name, label, helperText, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          {label && (
            <FormLabel
              error={!!error}
              sx={{
                mb: 1,
                display: 'block',
              }}
            >
              {label}
            </FormLabel>
          )}

          <UploadMultiBox
            files={field.value || []}
            error={!!error}
            helperText={error?.message || helperText}
            onDrop={(acceptedFiles: File[]) => {
              const newFiles = [...(field.value || []), ...acceptedFiles];
              field.onChange(newFiles);
            }}
            onRemove={(index: number) => {
              const newFiles = [...(field.value || [])];
              newFiles.splice(index, 1);
              field.onChange(newFiles);
            }}
            onRemoveAll={() => {
              field.onChange([]);
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
}
