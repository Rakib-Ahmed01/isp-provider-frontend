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
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLogout, IconMoon, IconSun } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Logo from './logo';
import Spinner from './spinner';

type Navlink = {
  id: number;
  label: string;
  href: string;
};

const navbarLinks: Navlink[] = [
  { id: 1, label: 'Home', href: '/' },
  { id: 2, label: 'Plans', href: '/plans' },
  { id: 3, label: 'FAQs', href: '/faqs' },
  { id: 4, label: 'Blogs', href: '/blogs' },
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
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  if (!authChecked && isAuthChecking) {
    return <Spinner />;
  }

  const handleSignout = () => {
    signout(dispatch);
    return redirect('/');
  };

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Flex align={'center'}>
              <Logo />
              <Text fw={600}>QuickNet</Text>
            </Flex>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === 'light' ? 'dark' : 'light'
                  )
                }
                variant="default"
                aria-label="Toggle color scheme"
                className={classes.control}
              >
                {computedColorScheme === 'dark' ? (
                  <IconSun stroke={1.5} className="mt-2" />
                ) : (
                  <IconMoon stroke={1.5} className="mt-2" />
                )}
              </UnstyledButton>
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
              <Menu.Dropdown left={18} top={390}>
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
            <UnstyledButton
              onClick={() =>
                setColorScheme(
                  computedColorScheme === 'light' ? 'dark' : 'light'
                )
              }
              variant="default"
              aria-label="Toggle color scheme"
              className={classes.control}
            >
              {computedColorScheme === 'dark' ? (
                <IconSun stroke={1.5} className="ml-3" />
              ) : (
                <IconMoon stroke={1.5} className="ml-3" />
              )}
            </UnstyledButton>
          </>
        ) : null}
      </AppShell.Navbar>
    </>
  );
}
