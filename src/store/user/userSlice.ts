import type { UserProfile } from '@/types/userProfile';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile } from './userThunks';

interface UserState {
  profile: UserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<UserProfile> | null>) => {
      state.profile = { ...state.profile, ...action.payload } as UserProfile;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
      },
    );
  },
});

export const { setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
