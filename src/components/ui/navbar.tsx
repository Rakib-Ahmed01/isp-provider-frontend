'use client';

import classes from '@/styles/navbar.module.css';
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

type Navlink = {
  id: number;
  label: string;
  href: string;
};

const navbarLinks: Navlink[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Dashboard', href: '/dashboard' },
  { id: 3, label: 'Login', href: '/login' },
  { id: 4, label: 'Register', href: '/register' },
];

export function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

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
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
