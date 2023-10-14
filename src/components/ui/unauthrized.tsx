'use client';

import { Anchor, Flex, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

interface UnauthorizedProps {}

const Unauthorized: FC<UnauthorizedProps> = () => {
  return (
    <Flex
      gap={'xs'}
      direction={'column'}
      justify={'center'}
      align={'center'}
      w={'100%'}
      h={'85vh'}
    >
      <Title order={3}>401</Title>
      <Text>{`You're not authorized to see this page`}</Text>
      <Anchor component={Link} href={'/login'}>
        Login
      </Anchor>
    </Flex>
  );
};

export default Unauthorized;
