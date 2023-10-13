import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export const useAuth = () => {
  const user = useAppSelector(selectAuth);

  return user?.token && user?.user ? true : false;
};
