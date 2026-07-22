import type { RootState } from '../index';

export const selectAvatarGenerationLoading = (state: RootState) =>
  state.avatarGeneration.loading;
export const selectAvatarGenerationProgress = (state: RootState) =>
  state.avatarGeneration.progress;
export const selectAvatarGenerationPreviews = (state: RootState) =>
  state.avatarGeneration.previews;
