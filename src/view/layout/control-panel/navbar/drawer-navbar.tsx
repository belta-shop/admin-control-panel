import { useTranslations } from 'next-intl';
import { Button, Drawer } from '@mui/material';

import { Iconify } from '@/view/components/iconify';
import { useSettingsStore } from '@/lib/store/settings';

import FullNavbar from './full-navbar';

export default function DrawerNavbar() {
  const t = useTranslations('Global.Action');
  const { isDrawerOpen, setDrawer } = useSettingsStore();

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setDrawer(false)}
      anchor="left"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button
        startIcon={<Iconify icon="ic:round-close" />}
        size="large"
        color="inherit"
        onClick={() => setDrawer(false)}
      >
        {t('close')}
      </Button>
      <FullNavbar
        sx={{
          maxWidth: '95vw',
          position: 'relative',
          boxShadow: 0,
          flexGrow: 1,
        }}
      />
    </Drawer>
  );
}
