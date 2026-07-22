import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  const showIndicator = loading || progress > 0;

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {!loading && <CheckCircleIcon color="success" fontSize="small" />}
        <Typography
          variant="body2"
          color={loading ? 'inherit' : 'success.main'}
        >
          {loading ? 'Generating...' : 'Generated!'}
        </Typography>
      </Box>
      <LinearProgress
        value={progress}
        variant="determinate"
        color={loading ? 'info' : 'success'}
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
        loading={showIndicator}
        loadingIndicator={loadingIndicator}
      >
        Generate
      </Button>
    </Tooltip>
  );
}
