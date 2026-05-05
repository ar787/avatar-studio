import { getUserProfile } from '@/services/api/user.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const result = await getUserProfile();
    return result;
  },
);
