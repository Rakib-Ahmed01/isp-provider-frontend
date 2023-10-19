'use client';

import Providers from '@/components/providers';
import { Navbar } from '@/components/ui/navbar';
import classes from '@/styles/navbar.module.css';
import '@mantine/carousel/styles.css';
import { AppShell, AppShellMain, ColorSchemeScript } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Inter } from 'next/font/google';
import './globals.css';

import { Footer } from '@/components/ui/footer';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <Providers>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md"
          >
            <Navbar toggle={toggle} opened={opened} classes={classes} />
            <AppShellMain>{children}</AppShellMain>
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
