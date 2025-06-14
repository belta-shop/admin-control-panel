import { Components, PaletteMode } from '@mui/material';

import { stack } from './stack';
import { popover } from './popover';
import { container } from './container';

export default function themeComponents(mode: PaletteMode): Components {
  return {
    MuiContainer: container(mode),
    MuiStack: stack(mode),
    MuiPopover: popover(mode),
  };
}
