import { useState } from 'react';

export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return {
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
    popoverProps: { anchorEl, open: isOpen, onClose: handleClose },
  };
}
