import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Box, AutocompleteProps } from '@mui/material';
import { TextField, Autocomplete } from '@mui/material';

import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { Category } from '@/lib/types/api/categories';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

type Props = {
  onChange: (category: Category | null) => void;
  defaultValue?: string | null;
} & Omit<
  AutocompleteProps<Category, false, false, false>,
  'options' | 'getOptionLabel' | 'value' | 'renderInput' | 'onChange' | 'defaultValue'
>;

export default function SearchCategoryInput({ onChange, defaultValue }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const { value: locale } = useCurrentLocale();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [categories, setCategories] = useState<Category[]>([]);
  const [value, setValue] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const [gotDefaultOnce, setGotDefaultOnce] = useState(false);
  useEffect(() => {
    if (gotDefaultOnce) return;
    if (!defaultValue) setGotDefaultOnce(true);
    const val = categories.find((category) => category._id === defaultValue) || null;
    if (val) {
      setValue(val);
      setGotDefaultOnce(true);
    }
  }, [categories, defaultValue, gotDefaultOnce]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get<{ items: Category[]; total: number }>(
          endpoints.categories.list,
          {
            params: {
              search: debouncedSearch,
            },
          }
        );

        setCategories(data.items);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [debouncedSearch, enqueueSnackbar]);

  return (
    <Autocomplete
      options={categories}
      getOptionLabel={(option) => (locale === 'en' ? option.nameEn : option.nameAr)}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        onChange(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setSearch(newInputValue);
      }}
      loading={loading}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField {...params} label={t('Global.Label.category')} variant="outlined" fullWidth />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Typography variant="body1">
              {locale === 'en' ? option.nameEn : option.nameAr}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {locale === 'en' ? option.nameAr : option.nameEn}
            </Typography>
          </Box>
        </Box>
      )}
      getOptionKey={(option) => option._id}
    />
  );
}
