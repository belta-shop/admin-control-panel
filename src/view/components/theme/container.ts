import { Components, PaletteMode } from '@mui/material';

export function container(_mode: PaletteMode): Components['MuiContainer'] {
  return { defaultProps: { maxWidth: 'xl' } };
}
