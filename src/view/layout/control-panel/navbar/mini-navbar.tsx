'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { Box, List, Stack, SxProps, Divider, Tooltip, Typography } from '@mui/material';

import Logo from '@/view/components/logo';
import { paths } from '@/lib/config/paths';
import Simplebar from '@/view/components/simplebar';
import { NAVBAR_WIDTH } from '@/lib/config/theme/layout';

import MiniNavItem from './mini-nav-item';
import { configNavigation } from '../config';

export default function MiniNavbar({ sx }: { sx?: SxProps }) {
  const t = useTranslations('Navigation');

  const renderList = (
    <List sx={{ pb: 2 }} component={Stack} spacing={0.5}>
      {configNavigation.map((section, i) => (
        <Fragment key={i}>
          {section.heading && (
            <Tooltip title={t(section.heading)} arrow placement="right">
              <Divider
                sx={{
                  mt: i === 0 ? 0 : 0.5,
                  '&::before': { borderColor: 'text.primary' },
                  '&::after': { borderColor: 'text.primary' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'text.primary', pb: 0.75, display: 'inline-block' }}
                >
                  •
                </Typography>
              </Divider>
            </Tooltip>
          )}

          {section.items.map((item) => (
            <MiniNavItem key={item.path} href={item.path} label={t(item.label)} icon={item.icon} />
          ))}
        </Fragment>
      ))}
    </List>
  );

  return (
    <Box
      sx={{
        width: NAVBAR_WIDTH.mini,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: 1,
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        ...sx,
      }}
    >
      <Logo sx={{ pr: 2, pl: 1.5, mt: 1, width: '100%', display: 'block' }} href={paths.root} />

      <Simplebar direction="vertical">{renderList}</Simplebar>
    </Box>
  );
}
