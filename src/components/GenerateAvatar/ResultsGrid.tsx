import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

type ResultsGridProps = Readonly<{
  previews: string[];
  loading: boolean;
  hasCredits: boolean;
}>;

export function ResultsGrid({
  previews,
  loading,
  hasCredits,
}: ResultsGridProps) {
  const hasContent = previews.length > 0 || (loading && hasCredits);

  if (!hasContent) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'surface.border',
          borderRadius: '16px',
          minHeight: 160,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ maxWidth: 220 }}
        >
          Your avatar will appear here once generated
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
    >
      {previews.map((preview, index) => (
        <Box
          key={preview + index}
          component="img"
          src={preview}
          alt="Generated avatar"
          sx={{
            width: '100%',
            height: 160,
            objectFit: 'cover',
            borderRadius: '16px',
          }}
        />
      ))}
      {loading && hasCredits && (
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: 'grey.900',
            borderRadius: '16px',
            height: 160,
          }}
        />
      )}
    </Box>
  );
}
