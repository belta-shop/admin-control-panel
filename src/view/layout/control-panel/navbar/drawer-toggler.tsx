import { Button } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { Iconify } from '@/view/components/iconify';
import { useSettingsStore } from '@/lib/store/settings';

export default function DrawerToggler() {
  const { setDrawer } = useSettingsStore();

  return (
    <Button
      variant="outlined"
      onClick={() => setDrawer(true)}
      sx={{ borderRadius: '100%', p: 1, minWidth: 0 }}
    >
      <Iconify icon={Icons.MENU} fontSize={24} />
    </Button>
  );
}
