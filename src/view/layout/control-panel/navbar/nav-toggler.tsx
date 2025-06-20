import { IconButton } from '@mui/material';

import { Icons } from '@/lib/config/icons';
import { NavbarType } from '@/lib/types/settings';
import { Iconify } from '@/view/components/iconify';
import { useSettingsStore } from '@/lib/store/settings';
import { NAVBAR_WIDTH } from '@/lib/config/theme/layout';
import { useCurrentLocale } from '@/lib/hooks/locale-hooks';

export default function NavToggler() {
  const { dir } = useCurrentLocale();

  const { navbarType, setNavbarType } = useSettingsStore();

  const isOpen = navbarType === 'full';

  return (
    <IconButton
      sx={{
        position: 'fixed',
        top: '60px',
        left: `${NAVBAR_WIDTH[navbarType]}px`,
        translate: dir === 'ltr' ? '-50% -50%' : '50% -50%',
        border: '1px solid',
        borderColor: 'text.disabled',
        width: 'fit-content',
        height: 'auto',
        aspectRatio: '1',
        p: 0.75,
        bgcolor: 'background.default',
        zIndex: 1200,
        rotate: isOpen ? '180deg' : '0deg',
        transition: 'opacity 150ms ease-in-out',
        '&:hover': {
          bgcolor: 'background.default',
          opacity: 0.8,
        },
      }}
      onClick={() => setNavbarType(isOpen ? NavbarType.MINI : NavbarType.FULL)}
    >
      <Iconify
        icon={Icons.ARROW_RIGHT}
        sx={{ rotate: dir === 'rtl' ? '180deg' : '0deg', scale: 2.5 }}
        fontSize={12}
        color="text.primary"
      />
    </IconButton>
  );
}
