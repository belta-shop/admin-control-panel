import { Components, PaletteMode } from '@mui/material';

export function stack(_mode: PaletteMode): Components['MuiStack'] {
  return { defaultProps: { useFlexGap: true } };
}
