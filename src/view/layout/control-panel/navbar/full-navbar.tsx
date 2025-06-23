'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { Box, List, Stack, SxProps, Divider, Typography } from '@mui/material';

import Logo from '@/view/components/logo';
import { paths } from '@/lib/config/paths';
import Simplebar from '@/view/components/simplebar';
import { NAVBAR_WIDTH } from '@/lib/config/theme/layout';

import { configNavigation } from '../config';
import VerticleNavItem from './full-nav-item';

export default function FullNavbar({ sx }: { sx?: SxProps }) {
  const t = useTranslations('Navigation');

  const renderList = (
    <List sx={{ pb: 2 }} component={Stack} spacing={0.5}>
      {configNavigation.map((section, i) => (
        <Fragment key={i}>
          {section.heading && (
            <Divider textAlign="left" sx={{ pr: 2, mt: i === 0 ? 0 : 0.5, mb: 0.5 }}>
              <Typography variant="caption" textTransform="uppercase">
                {t(section.heading)}
              </Typography>
            </Divider>
          )}

          {section.items.map((item) => (
            <VerticleNavItem
              key={item.path}
              href={item.path}
              label={t(item.label)}
              icon={item.icon}
            />
          ))}
        </Fragment>
      ))}
    </List>
  );

  return (
    <Box
      sx={{
        width: NAVBAR_WIDTH.full,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: 1,
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Logo
        full
        sx={{ pr: 2, pl: 1.5, mt: 1, width: '100%', display: 'block' }}
        href={paths.root}
      />

      <Simplebar direction="vertical">{renderList}</Simplebar>
    </Box>
  );
}
