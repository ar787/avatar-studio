import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { PageHeader } from '@/components/PageHeader';

const features = [
  {
    icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
    title: 'AI Avatar Generation',
    description:
      'Describe what you want in a prompt and generate stunning AI-powered avatars in seconds.',
  },
  {
    icon: <PhotoLibraryIcon fontSize="large" color="primary" />,
    title: 'Personal Library',
    description:
      'Browse and manage all your generated avatars in one place, organized and ready to use.',
  },
  {
    icon: <PhotoAlbumIcon fontSize="large" color="primary" />,
    title: 'Albums',
    description:
      'Group your favorite avatars into albums for easy access and sharing.',
  },
  {
    icon: <CloudDownloadIcon fontSize="large" color="primary" />,
    title: 'Easy Downloads',
    description:
      'Download any avatar in high resolution with a single click — yours to keep.',
  },
];

export default function AboutPage() {
  return (
    <Box sx={{ paddingTop: 5 }}>
      <PageHeader title="About" />

      <Stack spacing={6} sx={{ maxWidth: 720, mx: 'auto' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            What is My Profile?
          </Typography>
          <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
            My Profile is an AI-powered avatar platform that lets you generate
            unique, high-quality avatars from a simple text prompt. Whether you
            want a professional headshot, an artistic portrait, or something
            completely out of the ordinary — just describe it and we'll create
            it for you.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6 }}>
                <Stack
                  spacing={1.5}
                  sx={(theme) => ({
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: theme.palette.surface.background,
                    height: '100%',
                  })}
                >
                  {feature.icon}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            How it works
          </Typography>
          <Stack spacing={2}>
            {[
              'Create an account or sign in with Google.',
              'Write a prompt describing the avatar you want.',
              'Generate your AI avatar instantly.',
              'Save your favorites to albums and download them anytime.',
            ].map((step, i) => (
              <Stack
                key={step}
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  sx={{ minWidth: 28 }}
                >
                  {i + 1}.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  lineHeight={1.8}
                >
                  {step}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
