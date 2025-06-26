'use client';

import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Box, AutocompleteProps } from '@mui/material';
import { TextField, Autocomplete } from '@mui/material';

import { Brand } from '@/lib/types/api/brands';
import { getBrandList } from '@/lib/actions/brands';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

type Props = {
  onChange: (brand: Brand | null) => void;
  defaultValue?: string | null;
} & Omit<
  AutocompleteProps<Brand, false, false, false>,
  'options' | 'getOptionLabel' | 'value' | 'renderInput' | 'onChange' | 'defaultValue'
>;

export default function SearchProductInput({ onChange, defaultValue }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const { value: locale } = useCurrentLocale();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [value, setValue] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);

  const [gotDefaultOnce, setGotDefaultOnce] = useState(false);
  useEffect(() => {
    if (gotDefaultOnce) return;
    if (!defaultValue) setGotDefaultOnce(true);
    const val = brands.find((brand) => brand._id === defaultValue) || null;
    if (val) {
      setValue(val);
      setGotDefaultOnce(true);
    }
  }, [brands, defaultValue, gotDefaultOnce]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { items } = await getBrandList({
          search: debouncedSearch,
        });

        setBrands(items);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch, enqueueSnackbar]);

  return (
    <Autocomplete
      options={brands}
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
        <TextField {...params} label={t('Global.Label.brand')} variant="outlined" fullWidth />
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
