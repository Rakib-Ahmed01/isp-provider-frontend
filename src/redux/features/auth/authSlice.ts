import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    id: string;
    name: string;
    role: 'user' | 'admin' | 'super_admin' | '';
  };
  token: string;
}

const initialState: AuthState = {
  token: '',
  user: {
    id: '',
    name: '',
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loggedOut: (state) => {
      state.token = '';
      state.user = {
        id: '',
        name: '',
        role: '',
      };
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth;

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
