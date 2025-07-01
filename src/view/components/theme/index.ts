import { Theme, Components } from '@mui/material';

import { list } from './list';
import { chip } from './chip';
import { stack } from './stack';
import { table } from './table';
import { button } from './button';
import { popover } from './popover';
import { tooltip } from './tooltip';
import { container } from './container';
import { switchComponent } from './switch';
import { breadcrumbs } from './breadcrumbs';

export default function themeComponents(theme: Theme): Components {
  return {
    ...container(theme),
    ...stack(theme),
    ...popover(theme),
    ...tooltip(theme),
    ...button(theme),
    ...breadcrumbs(theme),
    ...switchComponent(theme),
    ...table(theme),
    ...list(theme),
    ...chip(theme),
  };
}
