'use client';

import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { Box, SxProps } from '@mui/material';
import { TextField, Autocomplete } from '@mui/material';

import { useLocaleNameKey } from '@/lib/utils/locale';

export interface ApiAutoCompleteItem {
  _id: string;
  nameEn: string;
  nameAr: string;
}

type Props<T> = {
  label: string;
  defaultValue?: string | null;
  searchFunction: (searchValue: string) => Promise<T[]>;
  onChange: (value: T | null) => void;
  sx?: SxProps;
};

export default function ApiAutoComplete<T extends ApiAutoCompleteItem>({
  label,
  defaultValue,
  searchFunction,
  onChange,
  sx,
}: Props<T>) {
  const { enqueueSnackbar } = useSnackbar();
  const localeKey = useLocaleNameKey();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [items, setItems] = useState<T[]>([]);
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle default value
  const [gotDefaultOnce, setGotDefaultOnce] = useState(!defaultValue);
  useEffect(() => {
    if (gotDefaultOnce) return;
    const val = items.find((item) => item._id === defaultValue) || null;
    if (val) setValue(val);
    setGotDefaultOnce(true);
  }, [items, defaultValue, gotDefaultOnce]);

  // Handle search
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await searchFunction(debouncedSearch);

        setItems(data);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => option[localeKey.current]}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        onChange(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        if (![value?.nameAr, value?.nameEn].includes(newInputValue)) setSearch(newInputValue);
      }}
      loading={loading}
      filterOptions={(x) => x}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" fullWidth />}
      renderOption={({ key, ...props }, option) => {
        return (
          <Box component="li" key={key} {...props}>
            <Box>
              <Typography variant="body1">{option[localeKey.current]}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option[localeKey.other]}
              </Typography>
            </Box>
          </Box>
        );
      }}
      getOptionKey={(option) => option._id}
      sx={sx}
    />
  );
}
