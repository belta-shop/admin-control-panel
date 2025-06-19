import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  TextField,
  IconButton,
  TextFieldProps,
  InputAdornment,
  textFieldClasses,
} from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { Iconify } from '@/view/components/iconify';
import { useQueryParams } from '@/lib/hooks/use-query-params';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  clearOtherParams?: string[];
}

export default function DebounceSearchField({
  name,
  label,
  clearOtherParams = [],
  ...textFieldProps
}: Props) {
  const t = useTranslations();
  const {
    values: { [name]: paramValue },
    set: setQuery,
  } = useQueryParams([name], { replace: true });
  const [inputValue, setInputValue] = useState(paramValue || '');
  const [debouncedValue] = useDebounce(inputValue, 500);

  // Update URL when debounced value changes
  useEffect(() => {
    const queryBody = { [name]: debouncedValue || null };
    // Clear other params
    clearOtherParams.forEach((param) => {
      queryBody[param] = null;
    });

    setQuery(queryBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // Update input value when URL parameter changes (e.g., from browser back/forward)
  useEffect(() => {
    setInputValue(paramValue || '');
  }, [paramValue]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <TextField
      {...textFieldProps}
      label={typeof label === 'string' ? label : t('Global.Label.search')}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      slotProps={{
        input: {
          endAdornment: inputValue ? <ClearButton handleClear={handleClear} /> : undefined,
        },
      }}
    />
  );
}

function ClearButton({ handleClear }: { handleClear: () => void }) {
  const t = useTranslations();
  return (
    <InputAdornment
      position="end"
      sx={{
        [`.${textFieldClasses.root}:not(:focus-within):not(:hover) &`]: {
          display: 'none',
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleClear}
        edge="end"
        aria-label={t('Global.Action.clear')}
      >
        <Iconify icon={Icons.XMARK} />
      </IconButton>
    </InputAdornment>
  );
}
