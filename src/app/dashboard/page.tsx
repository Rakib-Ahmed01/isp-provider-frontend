'use client';

import Spinner from '@/components/ui/spinner';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUser } from '@/hooks/useUser';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const user = useUser();
  const { authChecked, isAuthChecking } = useAuthCheck();

  if (!authChecked && isAuthChecking) {
    return <Spinner />;
  }

  if (!user.name) {
    return redirect('/login');
  }

  if (user.role === 'user') {
    return redirect('/dashboard/user');
  }

  if (user.role === 'super_admin') {
    return redirect('/dashboard/super-admin');
  }

  if (user.role === 'admin') {
    return redirect('/dashboard/admin');
  }
};

export default Dashboard;
