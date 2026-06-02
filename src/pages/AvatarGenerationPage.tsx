import Box from '@mui/material/Box';
import Grid, { type GridBaseProps } from '@mui/material/Grid';

import { downloadAvatarFromLibrary } from '@/services/api/download.api';
import HoverActionCard from '@/components/HoverActionCard';
import { PageHeader } from '@/components/PageHeader';
import { useGeneratedAvatars } from '@/hooks/queries/avatars';

import type { GeneratedAvatarType } from '@/types/avatar';

const sizes: GridBaseProps['size'] = { xs: 6, md: 4, lg: 3 };

export default function AvatarGenerationPage() {
  const { generatedAvatars } = useGeneratedAvatars();

  return (
    <Box sx={{ paddingTop: 5 }}>
      <PageHeader title="Library" />
      <AvatarCardList list={generatedAvatars} />
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
