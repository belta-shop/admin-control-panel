'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Switch, SwitchProps, FormControlLabel } from '@mui/material';

interface Props {
  name: string;
  label?: string;
}

export default function RHFSwitch({ name, label, sx, ...props }: Props & SwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          sx={{ mx: 0 }}
          control={<Switch {...field} {...props} checked={field.value} sx={{ mr: 1, ...sx }} />}
          label={label}
        />
      )}
    />
  );
}
