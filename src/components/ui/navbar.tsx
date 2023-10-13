'use client';

import useAuthCheck from '@/hooks/useAuthCheck';
import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import classes from '@/styles/navbar.module.css';
import {
  AppShell,
  Burger,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

type Navlink = {
  id: number;
  label: string;
  href: string;
};

const navbarLinks: Navlink[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Dashboard', href: '/dashboard' },
];

export function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const user = useAppSelector(selectUser);
  const { authChecked, isAuthChecking } = useAuthCheck();

  if (!authChecked && isAuthChecking) {
    return <p>Loading...</p>;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <MantineLogo size={30} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {navbarLinks.map((link) => (
                <UnstyledButton
                  component={Link}
                  href={link.href}
                  className={classes.control}
                  key={link.id}
                >
                  {link.label}
                </UnstyledButton>
              ))}
              {!user ? (
                <UnstyledButton
                  component={Link}
                  href={'/register'}
                  className={classes.control}
                >
                  Register
                </UnstyledButton>
              ) : null}
              {user ? (
                <Menu>
                  <Menu.Target>
                    <UnstyledButton className={classes.control}>
                      Account
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Flex gap={5} justify={'space-between'} align={'center'}>
                        <IconUser width={16} height={16} />
                        <Text>{user.name}</Text>
                      </Flex>
                    </Menu.Item>
                    <Menu.Item>
                      <Flex gap={5} justify={'space-between'} align={'center'}>
                        <IconLogout width={16} height={16} />
                        <Text>Logout</Text>
                      </Flex>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {navbarLinks.map((link) => (
          <UnstyledButton
            component={Link}
            href={link.href}
            className={classes.control}
            key={link.id}
          >
            {link.label}
          </UnstyledButton>
        ))}
        {!user ? (
          <UnstyledButton
            component={Link}
            href={'/register'}
            className={classes.control}
          >
            Register
          </UnstyledButton>
        ) : null}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
