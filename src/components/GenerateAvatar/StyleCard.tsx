import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type StyleCardProps = Readonly<{
  label: string;
  description: string;
  emoji: string;
  selected: boolean;
  onSelect: () => void;
}>;

export function StyleCard({
  label,
  description,
  emoji,
  selected,
  onSelect,
}: StyleCardProps) {
  return (
    <Box
      role="button"
      aria-pressed={selected}
      onClick={onSelect}
      sx={{
        position: 'relative',
        borderRadius: '12px',
        border: '2px solid',
        borderColor: selected ? 'primary.main' : 'rgba(255,255,255,0.12)',
        bgcolor: 'grey.900',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms cubic-bezier(0.4,0,0.2,1)',
        '&:hover': {
          borderColor: selected ? 'primary.main' : 'rgba(255,255,255,0.25)',
        },
      }}
    >
      {selected && (
        <CheckCircleIcon
          color="primary"
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            fontSize: 20,
            zIndex: 1,
            bgcolor: 'grey.900',
            borderRadius: '50%',
          }}
        />
      )}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
        }}
      >
        {emoji}
      </Box>
      <Box sx={{ p: 1, textAlign: 'left' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
          {label}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block' }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
