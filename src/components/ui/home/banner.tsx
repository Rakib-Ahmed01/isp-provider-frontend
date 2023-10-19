import { Box, Button, Text, Title } from '@mantine/core';
import Link from 'next/link';

export default function Banner() {
  return (
    <Box
      component="section"
      className="h-[70vh] border items-center flex flex-col justify-center gap-5"
    >
      <Title>QuickNet Your Gateway to High-Speed Internet</Title>
      <Text className="max-w-5xl text-center" c={'gray.6'}>
        Unlock a world of possibilities with QuickNet, your gateway to
        high-speed internet. Say goodbye to buffering and slow downloads and
        embrace the power of seamless streaming, online gaming, and remote work.
        Join us on the fast track to the digital future, and experience the
        internet like never before.
      </Text>
      <Button component={Link} href={'/plans'} className="max-w-[200px]">
        Browse Plans
      </Button>
    </Box>
  );
}
