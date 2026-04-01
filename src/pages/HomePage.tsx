import { Box, Grid, Fade } from '@mui/material';
import { use, useCallback, useEffect, useState } from 'react';
import { getAvatars } from '../services/api';
import AvatarCard from '../components/AvatarCard';
import type { GridBaseProps } from '@mui/material/PigmentGrid';
import AvatarView from '../components/AvatarView';
import type { AvatarType } from '../types/avatar';
import AvatarGenerator from '../components/AvatarGenerator';

const avatarsPromise = getAvatars();
const sizes: GridBaseProps['size'] = { xs: 4, md: 4, lg: 2 };
const STAGGER = 80; // ms delay per item
const ANIM_DURATION = 600;

export default function HomePage() {
  const avatars = use(avatarsPromise);
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState<AvatarType>();

  useEffect(() => {
    queueMicrotask(() => setShow(true));
  }, []);

  const handleClick = useCallback((avatar: AvatarType) => {
    setAvatar(avatar);
  }, []);

  const handleCloseAvatarDialog = useCallback(() => {
    setAvatar(undefined);
  }, []);

  return (
    <Box sx={{ paddingTop: 5 }}>
      <AvatarGenerator />
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {avatars.map((el, index) => (
          <Fade
            in={show}
            key={el.name}
            timeout={ANIM_DURATION}
            style={{
              transitionDelay: `${index * STAGGER}ms`,
            }}
          >
            <Grid size={sizes}>
              <Box>
                <AvatarCard
                  avatar={el}
                  name={`avatar-${index}`}
                  onClick={handleClick}
                />
              </Box>
            </Grid>
          </Fade>
        ))}
      </Grid>

      <AvatarView
        open={avatar !== undefined}
        imageUrl={avatar?.imageUrl ?? ''}
        name={avatar?.name ?? ''}
        onClose={handleCloseAvatarDialog}
      />
    </Box>
  );
}
