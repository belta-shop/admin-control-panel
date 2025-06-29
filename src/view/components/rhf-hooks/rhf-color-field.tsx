'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { MuiColorInput, MuiColorInputProps } from 'mui-color-input';

interface Props {
  name: string;
}

export default function RHFColorField({
  name,
  ...props
}: Props & Omit<MuiColorInputProps, 'value' | 'onChange'>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <MuiColorInput {...field} {...props} error={!!error} helperText={error?.message} />
      )}
    />
  );
}
