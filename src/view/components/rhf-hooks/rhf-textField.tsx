import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, IconButton, TextFieldProps } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

interface Props {
  name: string;
}

export default function RHFTextField({
  name,
  helperText,
  type: inputType,
  ...props
}: Props & TextFieldProps) {
  const { control } = useFormContext();
  const [type, setType] = useState(inputType);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message || helperText}
          type={type}
          slotProps={{
            input: {
              endAdornment:
                inputType === 'password' && !!field.value ? (
                  <IconButton onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                    <Iconify icon={type === 'password' ? Icons.EYE : Icons.EYE_OFF} />
                  </IconButton>
                ) : undefined,
            },
          }}
        />
      )}
    />
  );
}
