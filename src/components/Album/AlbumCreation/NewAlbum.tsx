import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import type { BoxProps } from '@mui/material/Box';

type NewAlbumProps = {
  onClick: BoxProps['onClick'];
};

export default function NewAlbum({ onClick }: Readonly<NewAlbumProps>) {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        width: 250,
        height: 176,
        borderRadius: 3,
        border: `2px dashed ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.customAction.menuHover,
          '& .new-album-icon': {
            color: theme.palette.primary.main,
          },
        },
      })}
    >
      <AddCircleOutlineIcon
        className="new-album-icon"
        sx={{
          fontSize: 40,
          color: 'text.disabled',
          transition: 'color 0.2s ease',
        }}
      />
      <Typography variant="body2" color="text.secondary">
        New album
      </Typography>
    </Box>
  );
}
