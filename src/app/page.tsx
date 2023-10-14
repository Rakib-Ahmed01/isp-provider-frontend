import { Button } from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Generated by create next app',
};

export default function Home() {
  return (
    <main>
      Home Page
      <Button variant="outline" className="sm:text-red-500 md:text-green-500">
        Click
      </Button>
    </main>
  );
}
