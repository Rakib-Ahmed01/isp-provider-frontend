'use client';

import useAuthCheck from '@/hooks/useAuthCheck';
import { signout } from '@/lib/signout';
import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import classes from '@/styles/navbar.module.css';
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
import { IconLogout } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Spinner from './spinner';

type Navlink = {
  id: number;
  label: string;
  href: string;
};

const navbarLinks: Navlink[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Services', href: '/services' },
  { id: 3, label: 'FAQ', href: '/faq' },
];

type NavbarProps = {
  toggle: () => void;
  opened: boolean;
  classes: {
    readonly [key: string]: string;
  };
};

export function Navbar({ toggle, opened, classes }: NavbarProps) {
  const user = useAppSelector(selectUser);
  const { authChecked, isAuthChecking } = useAuthCheck();
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!authChecked && isAuthChecking) {
    return <Spinner />;
  }

  const handleSignout = () => {
    signout(dispatch);
    router.push('/');
    router.refresh();
  };

  return (
    <>
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

              {!user.name ? (
                <>
                  <UnstyledButton
                    component={Link}
                    href={'/register'}
                    className={classes.control}
                  >
                    Register
                  </UnstyledButton>
                  <UnstyledButton
                    component={Link}
                    href={'/login'}
                    className={classes.control}
                  >
                    Login
                  </UnstyledButton>
                </>
              ) : null}
              {user.name ? (
                <>
                  <UnstyledButton
                    component={Link}
                    href={'/dashboard'}
                    className={classes.control}
                  >
                    Dashboard
                  </UnstyledButton>
                  <UnstyledButton
                    component={Link}
                    href={'/feedback'}
                    className={classes.control}
                  >
                    Feedback
                  </UnstyledButton>
                  <Menu>
                    <Menu.Target>
                      <UnstyledButton className={classes.control}>
                        Account
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>
                        <Flex gap={5} justify={'start'} align={'center'}>
                          <Image
                            alt={user.name}
                            src={user.profileImg}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <Text>{user.name}</Text>
                        </Flex>
                      </Menu.Item>
                      <Menu.Item onClick={() => handleSignout()}>
                        <Flex gap={5} justify={'start'} align={'center'}>
                          <IconLogout width={20} height={20} />
                          <Text>Logout</Text>
                        </Flex>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              ) : null}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4} hidden={!opened}>
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
        {!user.name ? (
          <>
            <UnstyledButton
              component={Link}
              href={'/register'}
              className={classes.control}
            >
              Register
            </UnstyledButton>
            <UnstyledButton
              component={Link}
              href={'/login'}
              className={classes.control}
            >
              Login
            </UnstyledButton>
          </>
        ) : null}
        {user.name ? (
          <>
            <UnstyledButton
              component={Link}
              href={'/dashboard'}
              className={classes.control}
            >
              Dashboard
            </UnstyledButton>
            <UnstyledButton
              component={Link}
              href={'/feedback'}
              className={classes.control}
            >
              Feedback
            </UnstyledButton>
            <Menu>
              <Menu.Target>
                <UnstyledButton className={classes.control}>
                  Account
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown left={18} top={300}>
                <Menu.Item>
                  <Flex gap={5} justify={'start'} align={'center'}>
                    <Image
                      alt={user.name}
                      src={user.profileImg}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <Text>{user.name}</Text>
                  </Flex>
                </Menu.Item>
                <Menu.Item onClick={() => handleSignout()}>
                  <Flex gap={5} justify={'start'} align={'center'}>
                    <IconLogout width={20} height={20} />
                    <Text>Logout</Text>
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : null}
      </AppShell.Navbar>
    </>
  );
}
