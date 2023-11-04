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
  IconBrandBlogger,
  IconBuildingBroadcastTower,
  IconMessageDots,
  IconQuestionMark,
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
  {
    icon: IconBuildingBroadcastTower,
    label: 'Plans',
    link: '/dashboard/admin/plans',
  },
  {
    icon: IconBrandBlogger,
    label: 'Blogs',
    link: '/dashboard/admin/blogs',
  },
  {
    icon: IconQuestionMark,
    label: 'FAQs',
    link: '/dashboard/admin/faqs',
  },
  {
    icon: IconMessageDots,
    label: 'Feedbacks',
    link: '/dashboard/admin/feedbacks',
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
  } else if (pathname.includes('orders')) {
    initialActive = 'Orders';
  } else if (pathname.includes('plans')) {
    initialActive = 'Plans';
  } else if (pathname.includes('blogs')) {
    initialActive = 'Blogs';
  } else if (pathname.includes('faqs')) {
    initialActive = 'FAQs';
  } else if (pathname.includes('feedbacks')) {
    initialActive = 'Feedbacks';
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
    <section className="w-full">
      <Box className="fixed bottom-5 right-5 sm:hidden z-10">
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
      <div className="flex justify-between w-full">
        <div className="hidden sm:block border">
          <DashboardSidebar data={data} initialActive={initialActive} />
        </div>
        <div className="sm:basis-3/4 sm:mx-auto">{children}</div>
      </div>
    </section>
  );
}
