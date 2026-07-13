import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { PresetType } from './hooks/useAvatarEditor';

type Preset = {
  key: PresetType;
  label: string;
  emoji: string;
};

const PRESETS: Preset[] = [
  { key: 'grayscale', label: 'Grayscale', emoji: '⬛' },
  { key: 'sepia', label: 'Sepia', emoji: '🟫' },
  { key: 'vintage', label: 'Vintage', emoji: '📷' },
  { key: 'kodachrome', label: 'Kodachrome', emoji: '🎞️' },
  { key: 'brownie', label: 'Brownie', emoji: '🍂' },
  { key: 'polaroid', label: 'Polaroid', emoji: '🖼️' },
  { key: 'blackwhite', label: 'Black & White', emoji: '◑' },
  { key: 'invert', label: 'Invert', emoji: '🔄' },
];

type Props = {
  active: PresetType | null;
  onSelect: (preset: PresetType | null) => void;
};

export function AvatarEditorPresets({ active, onSelect }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      {PRESETS.map(({ key, label, emoji }) => (
        <Chip
          key={key}
          label={`${emoji} ${label}`}
          onClick={() => onSelect(active === key ? null : key)}
          color={active === key ? 'primary' : 'default'}
          variant={active === key ? 'filled' : 'outlined'}
          sx={{ cursor: 'pointer' }}
        />
      ))}
    </Box>
  );
}
