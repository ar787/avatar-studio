import React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import type { SxProps } from '@mui/material/styles';

type ProfileAvatarProps = {
  src: string;
  onUpload: (file: File, imageUrl: string) => void;
};

const buttonBaseSx: SxProps = {
  border: '2px dashed #fff',
  borderRadius: '50%',
  width: '140px',
  height: '140px',
  padding: 2,
  position: 'relative',
  backgroundColor: '#ebe9e90f',
  '&:has(:focus-visible)': {
    outline: '2px solid',
    outlineOffset: '2px',
  },
};

const avatarSx: SxProps = {
  top: 'calc(50% - 63px)',
  left: 'calc(50% - 63px)',
  width: '126px',
  height: '126px',
  position: 'absolute',
};

export default function ProfileAvatar({
  src,
  onUpload,
}: Readonly<ProfileAvatarProps>) {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(file, reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <Box>
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1}
        aria-label="Avatar image"
        sx={buttonBaseSx}
      >
        <Avatar src={src} sx={avatarSx} />
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '1px',
          }}
          onChange={handleAvatarChange}
        />
      </ButtonBase>
      <Typography variant="caption" component="p">
        Click or drop image to upload
      </Typography>
    </Box>
  );
}
