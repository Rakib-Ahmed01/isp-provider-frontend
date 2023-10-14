import { AppShellHeader } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AppShellHeader>Test Navbar</AppShellHeader>
      {children}
    </section>
  );
}
