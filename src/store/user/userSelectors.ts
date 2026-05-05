import type { RootState } from '@/store';

export const selectUserProfile = (state: RootState) => state.user.profile;
