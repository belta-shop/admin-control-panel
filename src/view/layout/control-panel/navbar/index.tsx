import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

import { NavbarType } from '@/lib/types/settings';
import { useSettingsStore } from '@/lib/store/settings';
import { LOCAL_STORAGE_KEYS } from '@/lib/config/global';

import FullNavbar from './full-navbar';
import NavToggler from './nav-toggler';
import MiniNavbar from './mini-navbar';
import DrawerNavbar from './drawer-navbar';
export default function Navbar() {
  const { navbarType, setNavbarType } = useSettingsStore();

  const isMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    const savedNavbarType = localStorage.getItem(LOCAL_STORAGE_KEYS.NavbarType);
    if (savedNavbarType === NavbarType.MINI || savedNavbarType === NavbarType.FULL) {
      setNavbarType(savedNavbarType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {isMd && navbarType === 'full' && <FullNavbar />}
      {isMd && navbarType === 'mini' && <MiniNavbar />}
      {isMd && <NavToggler />}

      {!isMd && <DrawerNavbar />}
    </>
  );
}
