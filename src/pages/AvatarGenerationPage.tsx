import { useLoaderData } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import Grid, { type GridBaseProps } from '@mui/material/Grid';

import { downloadAvatarFromLibrary } from '@/services/api/download.api';
import HoverActionCard from '@/components/HoverActionCard';

import type { GeneratedAvatarType } from '@/types/avatar';

const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  paddingTop: 5,
};

const sizes: GridBaseProps['size'] = { xs: 6, md: 4, lg: 3 };

export default function AvatarGenerationPage() {
  const list = useLoaderData({ from: '/_layout/avatar-generation' });

  return (
    <Box sx={containerSx}>
      <AvatarCardList list={list} />
    </Box>
  );
}

type AvatarCardListProps = {
  list: GeneratedAvatarType[];
};

function AvatarCardList({ list }: Readonly<AvatarCardListProps>) {
  return (
    <Grid container spacing={2} sx={{ mt: 4, width: '100%' }}>
      {list.map((avatar) => (
        <Grid size={sizes} key={avatar.name}>
          <HoverActionCard
            id={avatar.id}
            src={avatar.url}
            onDownload={() => downloadAvatarFromLibrary(avatar.name)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
