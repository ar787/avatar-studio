import type { AvatarStyle } from '@/types/avatar';

export const AVATAR_STYLES: {
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
