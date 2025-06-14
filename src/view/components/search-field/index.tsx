import { InputBase } from '@mui/material';
import { useTranslations } from 'next-intl';
import { styled, SxProps } from '@mui/material';

import { Icons } from '@/lib/config/icons';

import { Iconify } from '../iconify';

export default function SearchField({ label, sx }: { label?: string; sx?: SxProps }) {
  const t = useTranslations('Global.Label');

  return (
    <Search sx={sx}>
      <SearchIconWrapper>
        <Iconify icon={Icons.SEARCH} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={label ?? `${t('search')}...`}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  borderRadius: 200,
  width: 'min(100%, 28ch)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 2, 1, 0),
    color: theme.palette.text.primary,
    width: '100%',
  },
}));
