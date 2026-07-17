import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import Button from '@/ui/components/Button';

type AvatarCreationButtonProps = {
  text: string;
  progress: number;
  showProgress: boolean;
  onClick: () => void;
  compact?: boolean;
  active?: boolean;
};
export const AvatarCreationButton = ({
  text,
  progress,
  showProgress,
  onClick,
  compact = false,
  active = false,
}: Readonly<AvatarCreationButtonProps>) => {
  if (compact) {
    return (
      <Box
        role="button"
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          py: 1,
          px: 0.5,
          borderRadius: 1.5,
          width: 64,
          cursor: 'pointer',
          color: active ? '#7c4dff' : 'rgba(255,255,255,0.5)',
          bgcolor: active ? 'rgba(124,77,255,0.08)' : 'transparent',
          transition:
            'background-color 200ms cubic-bezier(0.4,0,0.2,1), color 200ms cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            bgcolor: active
              ? 'rgba(124,77,255,0.12)'
              : 'rgba(255,255,255,0.06)',
            color: active ? '#7c4dff' : 'rgba(255,255,255,0.8)',
          },
        }}
      >
        <AutoFixHighIcon
          sx={
            active
              ? { filter: 'drop-shadow(0 0 6px rgba(124,77,255,0.6))' }
              : undefined
          }
        />
        <Box
          component="span"
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {text}
        </Box>
        {showProgress && (
          <LinearProgress
            value={progress}
            variant="determinate"
            color="info"
            sx={{ width: '100%', borderRadius: 1, mt: 0.5 }}
          />
        )}
      </Box>
    );
  }

  return (
    <Button
      startIcon={<AutoFixHighIcon />}
      onClick={onClick}
      sx={{
        transition: 'all 300ms ease',
        '& .MuiButton-startIcon': {
          marginRight: 1,
          marginLeft: {
            xs: 0,
            md: -0.5,
          },
          // Adjust icon size for different screen sizes
          '&>*:nth-of-type(1)': {
            fontSize: {
              xs: '24px',
              md: '20px',
            },
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'all 300ms ease',
          gap: showProgress ? '8px' : 0,
        }}
      >
        <Typography variant="body1">{text}</Typography>

        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            maxHeight: showProgress ? 20 : 0,
            opacity: showProgress ? 1 : 0,
            transition: 'all 300ms ease',
          }}
        >
          <LinearProgress value={progress} variant="determinate" color="info" />
        </Box>
      </Box>
    </Button>
  );
};
