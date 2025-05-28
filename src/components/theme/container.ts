import { Components, PaletteMode } from '@mui/material';

export function container(mode: PaletteMode): Components['MuiContainer'] {
  return { defaultProps: { maxWidth: 'xl' } };
}
