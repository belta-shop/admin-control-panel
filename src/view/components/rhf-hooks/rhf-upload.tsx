'use client';

import { Box, FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import UploadBox from '../upload/upload-box';

interface Props {
  name: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  maxSize?: number; // in bytes
}

export default function RHFUpload({ name, label, helperText, disabled, maxSize }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
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

          <UploadBox
            file={value}
            error={!!error}
            helperText={error?.message || helperText}
            disabled={disabled}
            maxSize={maxSize}
            onDrop={(acceptedFiles) => {
              onChange(acceptedFiles[0]);
            }}
          />
        </Box>
      )}
    />
  );
}
