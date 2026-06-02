export const queryKeys = {
  albums: () => ['albums'] as const,
  album: (id: string) => ['album', id] as const,
  avatars: () => ['avatars'] as const,
  generatedAvatars: () => ['generated-avatars'] as const,
};
