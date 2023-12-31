'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';
import { Box, Button, Card, Stack, Text, Title } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface SuperAdminProps {}

const SuperAdmin: FC<SuperAdminProps> = () => {
  const { data, isLoading, isError } = useGetUserProfileQuery('');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="profile" />;
  }

  const user = (data || {}) as User;

  return (
    <Box className="w-full mx-auto">
      <Title order={2} size="h1" fw={800} ta="center" mb={20}>
        Profile
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <Image
            alt={user.name}
            src={user.profileImg}
            width={100}
            height={100}
            className="mx-auto rounded-full"
            priority={true}
          />

          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>
            Role:{' '}
            {upperFirst(user.role.split('_')[0]) +
              ' ' +
              upperFirst(user.role.split('_')[1])}
          </Text>
          <Button
            component={Link}
            href={'/dashboard/super-admin/update-profile'}
          >
            Update
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default SuperAdmin;
