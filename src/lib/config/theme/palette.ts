import { Palette, PaletteMode, PaletteColor } from '@mui/material';

const primary: PaletteColor = {
  light: '#5d82e7',
  main: '#4c66af',
  dark: '#35477b',
  contrastText: '#fff',
};

const base: Partial<Palette> = {
  primary,
};

const light: Partial<Palette> = {
  background: {
    paper: '#fff',
    default: '#eceeff33',
  },
  text: {
    primary: '#000',
    secondary: '#111827',
    disabled: '#dddee3',
  },
  divider: 'rgba(58, 53, 65, 0.1)',
};

const dark: Partial<Palette> = {
  background: {
    paper: 'rgb(49, 45, 75)',
    default: 'rgb(40, 36, 61)',
  },
  text: {
    primary: 'rgba(231, 227, 252, 0.87)',
    secondary: 'rgba(231, 227, 252, 0.68)',
    disabled: '#444059',
  },
  divider: '#605c7560',
};

export const createPalette = (mode: PaletteMode): Partial<Palette> => {
  return {
    mode,
    ...base,
    ...(mode === 'light' ? light : dark),
  };
};
