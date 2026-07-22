import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import Button from '@ui/components/Button';

type GenerateButtonProps = Readonly<{
  disabled: boolean;
  loading: boolean;
  progress: number;
  tooltipTitle: string;
  onClick: () => void;
}>;

export function GenerateButton({
  disabled,
  loading,
  progress,
  tooltipTitle,
  onClick,
}: GenerateButtonProps) {
  const loadingIndicator = (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="body2">Generating...</Typography>
      <LinearProgress
        value={progress}
        variant="determinate"
        color="info"
        sx={{ width: '100%' }}
      />
    </Box>
  );
  return (
    <Tooltip title={tooltipTitle}>
      <Button
        fullWidth
        startIcon={<AutoFixHighIcon />}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        loadingIndicator={loadingIndicator}
      >
        Generate
      </Button>
    </Tooltip>
  );
}
