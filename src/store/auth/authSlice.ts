import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isInitialLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
