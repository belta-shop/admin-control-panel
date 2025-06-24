'use client';

import { useSnackbar } from 'notistack';
import { Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Box, AutocompleteProps } from '@mui/material';
import { TextField, Autocomplete } from '@mui/material';

import { useCurrentLocale } from '@/lib/hooks/locale-hooks';
import { SubCategory } from '@/lib/types/api/sub-categories';
import { getSubCategoryList } from '@/lib/actions/sub-category';

type Props = {
  onChange: (subCategory: SubCategory | null) => void;
  defaultValue?: string | null;
} & Omit<
  AutocompleteProps<SubCategory, false, false, false>,
  'options' | 'getOptionLabel' | 'value' | 'renderInput' | 'onChange' | 'defaultValue'
>;

export default function SearchSubCategoryInput({ onChange, defaultValue }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const { value: locale } = useCurrentLocale();

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [value, setValue] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(false);

  const [gotDefaultOnce, setGotDefaultOnce] = useState(false);
  useEffect(() => {
    if (gotDefaultOnce) return;
    if (!defaultValue) setGotDefaultOnce(true);
    const val = subCategories.find((subCategory) => subCategory._id === defaultValue) || null;
    if (val) {
      setValue(val);
      setGotDefaultOnce(true);
    }
  }, [subCategories, defaultValue, gotDefaultOnce]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSubCategoryList({
          search: debouncedSearch,
        });

        setSubCategories(data.items);
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
      options={subCategories}
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
        <TextField
          {...params}
          label={t('Global.Label.sub_category')}
          variant="outlined"
          fullWidth
        />
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
