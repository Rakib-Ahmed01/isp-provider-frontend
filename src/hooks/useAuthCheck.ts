import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { AuthState, loggedIn } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';

export default function useAuthCheck() {
  // state for auth check
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // get user data from the local storage
    const auth = JSON.parse(
      localStorage.getItem(AUTH_TOKEN_KEY) as string
    ) as AuthState;

    // if user data is not null dispatch userLoggedIn function with user data
    if (auth?.token && auth?.user) {
      dispatch(
        loggedIn({
          token: auth.token,
          user: auth.user,
        })
      );
    }
    // set auth check to true
    setAuthChecked(true);
    setIsAuthChecking(false);
  }, [dispatch]);

  // return auth check
  return { authChecked, isAuthChecking };
}
