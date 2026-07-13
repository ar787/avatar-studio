import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { AdjustState, PresetType } from '@/types/avatar';

const ADJUSTMENT_LABELS: Record<keyof AdjustState, string> = {
  brightness: 'Brightness',
  contrast: 'Contrast',
  saturation: 'Saturation',
  hueRotation: 'Hue',
  vibrance: 'Vibrance',
  blur: 'Blur',
};

function formatValue(value: number) {
  const pct = Math.round(value * 100);
  return pct > 0 ? `+${pct}%` : `${pct}%`;
}

type Props = {
  adjustments?: AdjustState;
  preset?: PresetType | null;
};

export function AvatarEditorBadges({ adjustments, preset }: Readonly<Props>) {
  const activeAdjustments = adjustments
    ? (Object.entries(adjustments) as [keyof AdjustState, number][]).filter(
        ([, v]) => Math.abs(v) >= 0.01,
      )
    : [];

  if (!preset && activeAdjustments.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
        background:
          'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }}
    >
      {preset && (
        <Chip
          label={preset}
          size="small"
          sx={{
            bgcolor: 'rgba(22, 216, 102, 0.15)',
            color: 'rgba(63, 221, 120, 1)',
            border: '1px solid rgba(22, 216, 102, 0.3)',
            fontSize: 10,
            height: 20,
          }}
        />
      )}
      {activeAdjustments.map(([key, value]) => (
        <Typography
          key={key}
          variant="caption"
          sx={{
            bgcolor: 'rgba(0,0,0,0.55)',
            color: '#fff',
            borderRadius: '4px',
            px: 0.75,
            py: 0.25,
            fontSize: 10,
            lineHeight: '20px',
          }}
        >
          {ADJUSTMENT_LABELS[key]} {formatValue(value)}
        </Typography>
      ))}
    </Box>
  );
}
