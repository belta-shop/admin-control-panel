import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Autocomplete } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { useQueryParams } from '@/lib/hooks/use-query-params';

import { Iconify } from '../iconify';

export interface BooleanOption {
  label: string;
  value: string | null;
}

export default function BooleanFilter({
  name,
  label,
  clearOtherParams = [],
  fullWidth = false,
}: {
  name: string;
  label?: string;
  clearOtherParams?: string[];
  fullWidth?: boolean;
}) {
  const t = useTranslations();
  const {
    values: { [name]: paramValue },
    set: setQuery,
  } = useQueryParams([name], { replace: true });

  const options: BooleanOption[] = [
    { label: t('Global.Label.yes'), value: 'true' },
    { label: t('Global.Label.no'), value: 'false' },
  ];

  const currentOption = options.find((option) => option.value === paramValue) || undefined;

  const handleChange = (_: any, newValue: BooleanOption | null) => {
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
