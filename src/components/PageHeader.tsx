import { useRouter } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/ui/components/Button';

type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: Readonly<PageHeaderProps>) {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <Button
        variant="text"
        onClick={() => router.history.back()}
        aria-label="Go back"
        startIcon={<ArrowBackIcon />}
        sx={(theme) => ({
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.customAction.menuHover,
          },
        })}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Button>
    </Box>
  );
}
