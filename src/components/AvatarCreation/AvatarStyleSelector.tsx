import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import type { AvatarStyle } from '@/types/avatar';

const AVATAR_STYLES: {
  value: AvatarStyle;
  label: string;
  description: string;
  emoji: string;
}[] = [
  {
    value: 'none',
    label: 'No Style',
    description: 'Let AI decide',
    emoji: '🤖',
  },
  {
    value: 'anime',
    label: 'Anime',
    description: 'Japanese animation aesthetic',
    emoji: '🌸',
  },
  {
    value: 'simpsons',
    label: 'Simpsons',
    description: 'Classic Springfield cartoon',
    emoji: '😬',
  },
  {
    value: 'soviet',
    label: 'Soviet Vintage',
    description: 'Bold retro poster art',
    emoji: '⭐',
  },
  {
    value: 'oilPainting',
    label: 'Oil Painting',
    description: 'Classical painting',
    emoji: '🧑🏻‍🎨',
  },
];

type AvatarStyleSelectorProps = {
  value: AvatarStyle;
  onChange: (style: AvatarStyle) => void;
};

export function AvatarStyleSelector({
  value,
  onChange,
}: Readonly<AvatarStyleSelectorProps>) {
  return (
    <>
      <Typography
        variant="overline"
        sx={{
          letterSpacing: 2,
          color: 'text.secondary',
          display: 'block',
          mb: 1.5,
        }}
      >
        Choose a style
      </Typography>
      <ToggleButtonGroup
        value={value}
        onChange={(_, val) => val && onChange(val)}
        exclusive
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
        }}
      >
        {AVATAR_STYLES.map((style) => {
          const isSelected = value === style.value;
          return (
            <ToggleButton
              key={style.value}
              value={style.value}
              sx={(theme) => ({
                position: 'relative',
                width: 160,
                height: 'auto',
                borderRadius: '12px !important',
                border: '2px solid rgba(255, 255, 255, 0.12) !important',
                bgcolor: 'grey.900',
                p: 0,
                overflow: 'hidden',
                flexDirection: 'column',
                alignItems: 'stretch',
                textTransform: 'none',
                '&.Mui-selected': {
                  bgcolor: 'grey.900',
                  borderWidth: '2px',
                  borderColor: `${theme.palette.primary.main} !important`,
                  '&:hover': { bgcolor: 'grey.900' },
                },
              })}
            >
              {isSelected && (
                <CheckCircleIcon
                  color="primary"
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                />
              )}
              <Box
                sx={{
                  height: 72,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}
              >
                {style.emoji}
              </Box>
              <Box sx={{ p: 1, textAlign: 'left' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {style.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {style.description}
                </Typography>
              </Box>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
}
