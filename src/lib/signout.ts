import { loggedOut } from '@/redux/features/auth/authSlice';
import { AppDispatch } from '@/redux/store';
import { AUTH_TOKEN_KEY } from './constants';

export const signout = (dispatch: AppDispatch) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  dispatch(loggedOut());
};
