'use client';

import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Autocomplete } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { useQueryParams } from '@/lib/hooks/use-query-params';

import { Iconify } from '../iconify';

export interface StatusOption {
  label: string;
  value: string | null;
}

export default function StatusFilter({
  name,
  label,
  clearOtherParams = [],
  fullWidth = false,
  reverse = false,
}: {
  name: string;
  label?: string;
  clearOtherParams?: string[];
  fullWidth?: boolean;
  reverse?: boolean;
}) {
  const t = useTranslations();
  const {
    values: { [name]: paramValue },
    set: setQuery,
  } = useQueryParams([name], { replace: true });

  const options: StatusOption[] = [
    { label: t('Global.Label.enabled'), value: !reverse ? 'true' : 'false' },
    { label: t('Global.Label.disabled'), value: !reverse ? 'false' : 'true' },
  ];

  const currentOption = options.find((option) => option.value === paramValue) || null;

  const handleChange = (_: any, newValue: StatusOption | null) => {
    const queryBody = { [name]: newValue?.value || null };
    // Clear other params
    clearOtherParams.forEach((param) => {
      queryBody[param] = null;
    });

    setQuery(queryBody);
  };

  return (
    <Autocomplete
      options={options}
      value={currentOption}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField {...params} label={label} fullWidth={fullWidth} />}
      clearIcon={<Iconify icon={Icons.XMARK} fontSize={18} />}
    />
  );
}
