import { Theme, Components } from '@mui/material';

import { stack } from './stack';
import { popover } from './popover';
import { tooltip } from './tooltip';
import { container } from './container';

export default function themeComponents(theme: Theme): Components {
  return {
    ...container(theme),
    ...stack(theme),
    ...popover(theme),
    ...tooltip(theme),
  };
}
