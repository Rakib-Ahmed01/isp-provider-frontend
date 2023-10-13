import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export const useUserRole = () => {
  const user = useAppSelector(selectUser);

  return user?.role;
};
