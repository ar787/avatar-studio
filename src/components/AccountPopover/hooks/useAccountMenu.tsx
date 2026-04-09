import { useState } from 'react';

export function useAccountMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
  };
}
