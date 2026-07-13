import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import type { AdjustState } from './hooks/useAvatarEditor';

type AvatarEditorControlsProps = {
  adjustments: AdjustState;
  onBrightness: (v: number) => void;
  onContrast: (v: number) => void;
  onSaturation: (v: number) => void;
  onHueRotation: (v: number) => void;
  onVibrance: (v: number) => void;
  onBlur: (v: number) => void;
};

type SliderRowProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
};

function SliderRow({
  label,
  value,
  min = -1,
  max = 1,
  step = 0.01,
  onChange,
}: Readonly<SliderRowProps>) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {value > 0
            ? `+${(value * 100).toFixed(0)}`
            : (value * 100).toFixed(0)}
        </Typography>
      </Box>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        marks={[{ value: 0 }]}
        onChange={(_e, v) => {
          const raw = Array.isArray(v) ? v[0] : v;
          onChange(Math.abs(raw) < 0.03 ? 0 : raw);
        }}
        size="small"
      />
    </Box>
  );
}

export function AvatarEditorControls({
  adjustments,
  onBrightness,
  onContrast,
  onSaturation,
  onHueRotation,
  onVibrance,
  onBlur,
}: Readonly<AvatarEditorControlsProps>) {
  return (
    <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SliderRow
        label="Brightness"
        value={adjustments.brightness}
        onChange={onBrightness}
      />
      <SliderRow
        label="Contrast"
        value={adjustments.contrast}
        onChange={onContrast}
      />
      <SliderRow
        label="Saturation"
        value={adjustments.saturation}
        onChange={onSaturation}
      />
      <SliderRow
        label="Hue Rotation"
        value={adjustments.hueRotation}
        onChange={onHueRotation}
      />
      <SliderRow
        label="Vibrance"
        value={adjustments.vibrance}
        onChange={onVibrance}
      />
      <SliderRow
        label="Blur"
        value={adjustments.blur}
        min={0}
        max={1}
        onChange={onBlur}
      />
    </Box>
  );
}
