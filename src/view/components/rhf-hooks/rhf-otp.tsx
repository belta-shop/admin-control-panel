'use client';

import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Stack, TextField, FormLabel, TextFieldProps } from '@mui/material';

interface Props {
  name: string;
  label?: string;
}

export default function RHFOTP({ name, label, helperText, ...props }: Props & TextFieldProps) {
  const { control } = useFormContext();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleKeyDown =
    (index: number, fieldValue?: string, onChange?: (value: string) => void) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (fieldValue) {
          // If field has value, clear it
          onChange?.('');
        } else if (index > 0) {
          // If field is empty, go to previous field and clear it
          const prevInput = inputRefs[index - 1].current;
          prevInput?.focus();
          prevInput?.select();
          onChange?.('');
        }
      }
    };

  const handleChange =
    (index: number, onChange: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length === 1 && index < 3) {
        const nextInput = inputRefs[index + 1].current;
        nextInput?.focus();
        nextInput?.select();
      }
      onChange(value);
    };

  return (
    <Stack spacing={1}>
      {label && <FormLabel>{label}</FormLabel>}
      <div dir="ltr">
        <Stack direction="row" spacing={1} justifyContent="center">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`${name}.${index}`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  {...props}
                  inputRef={inputRefs[index]}
                  error={!!error}
                  slotProps={{
                    htmlInput: {
                      maxLength: 1,
                      style: {
                        textAlign: 'center',
                        caretColor: 'transparent',
                      },
                    },
                  }}
                  onChange={handleChange(index, field.onChange)}
                  onKeyDown={handleKeyDown(index, field.value, field.onChange)}
                  sx={{ width: '60px' }}
                />
              )}
            />
          ))}
        </Stack>
      </div>
    </Stack>
  );
}
