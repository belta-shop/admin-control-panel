'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Switch, SwitchProps, FormControlLabel } from '@mui/material';

interface Props {
  name: string;
  label?: string;
}

export default function RHFReversedSwitch({ name, label, sx, ...props }: Props & SwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormControlLabel
          sx={{ mx: 0 }}
          control={
            <Switch
              {...field}
              {...props}
              checked={!field.value}
              onChange={(_e) => onChange(!field.value)}
              sx={{ mr: 1, ...sx }}
            />
          }
          label={label}
        />
      )}
    />
  );
}
