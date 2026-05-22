import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@ui/components/Menu';

type AlbumCardMenuProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
};

export default function AlbumCardMenu({
  anchorEl,
  onClose,
  onRename,
  onDelete,
}: Readonly<AlbumCardMenuProps>) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={onRename}>
        <ListItemIcon>
          <EditIcon sx={{ color: 'primary.contrastText' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText>Rename</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: 'error.main' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}
