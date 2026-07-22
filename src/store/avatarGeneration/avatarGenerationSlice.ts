import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AvatarGenerationState {
  loading: boolean;
  progress: number;
  previews: string[];
}

const initialState: AvatarGenerationState = {
  loading: false,
  progress: 0,
  previews: [],
};

const avatarGenerationSlice = createSlice({
  name: 'avatarGeneration',
  initialState,
  reducers: {
    generationStarted: (state) => {
      state.loading = true;
      state.progress = 3;
    },
    progressAdvanced: (state) => {
      state.progress += (90 - state.progress) * 0.1;
    },
    generationSucceeded: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.progress = 100;
      state.previews.push(...action.payload);
    },
    generationFailed: (state) => {
      state.loading = false;
    },
    progressReset: (state) => {
      state.progress = 0;
    },
  },
});

export const {
  generationStarted,
  progressAdvanced,
  generationSucceeded,
  generationFailed,
  progressReset,
} = avatarGenerationSlice.actions;
export default avatarGenerationSlice.reducer;
