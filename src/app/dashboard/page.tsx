'use client';

import { useUser } from '@/hooks/useUser';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const user = useUser();

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
