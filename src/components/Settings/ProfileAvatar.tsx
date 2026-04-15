import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import type { SxProps } from '@mui/material/styles';
import { Typography } from '@mui/material';

type ProfileAvatarProps = {
  src: string;
};

const boxSx: SxProps = {
  border: '2px dashed #fff',
  borderRadius: '50%',
  width: '140px',
  height: '140px',
  padding: 2,
  position: 'relative',
  backgroundColor: '#ebe9e90f',
};

const avatarSx: SxProps = {
  top: 'calc(50% - 63px)',
  left: 'calc(50% - 63px)',
  width: '126px',
  height: '126px',
  position: 'absolute',
};

export default function ProfileAvatar({ src }: Readonly<ProfileAvatarProps>) {
  return (
    <Box>
      <Box sx={boxSx}>
        <Avatar src={src} sx={avatarSx} />
      </Box>
      <Typography variant="caption">Click or drop image to upload</Typography>
    </Box>
  );
}
