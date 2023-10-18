'use client';

import {
  DashboardSidebar,
  DashboardSidebarProps,
} from '@/components/ui/dashboard-navbar';
import Spinner from '@/components/ui/spinner';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUser } from '@/hooks/useUser';
import { Box, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconShoppingCart,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { redirect, usePathname } from 'next/navigation';

const data: DashboardSidebarProps['data'] = [
  {
    icon: IconUser,
    label: 'Profile',
    link: '/dashboard/admin',
  },
  {
    icon: IconUsersGroup,
    label: 'Users',
    link: '/dashboard/admin/users',
  },
  {
    icon: IconShoppingCart,
    label: 'Orders',
    link: '/dashboard/admin/orders',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const user = useUser();
  const { isAuthChecking } = useAuthCheck();
  const pathname = usePathname();
  let initialActive = '';

  if (pathname.includes('users')) {
    initialActive = 'Users';
  } else if (pathname.includes('Orders')) {
    initialActive = 'Orders';
  } else {
    initialActive = 'Profile';
  }

  if (isAuthChecking) {
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

  return (
    <section className="flex gap-5">
      <div className="hidden sm:block">
        <DashboardSidebar data={data} initialActive={initialActive} />
      </div>
      <Box className="fixed bottom-5 right-5 sm:hidden">
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
      </Box>
      <Drawer
        className="sm:hidden"
        opened={opened}
        onClose={toggle}
        title="Dashboard"
        size={'xs'}
      >
        <DashboardSidebar data={data} initialActive={initialActive} />
      </Drawer>
      {children}
    </section>
  );
}
