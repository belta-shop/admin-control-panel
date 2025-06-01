import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
}

export default function RHFTextField({ name, helperText, ...props }: Props & TextFieldProps) {
  const { control } = useFormContext();

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
        />
      )}
    />
  );
}
