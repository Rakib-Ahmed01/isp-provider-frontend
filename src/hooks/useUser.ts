import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export const useUser = () => {
  return useAppSelector(selectUser);
};
