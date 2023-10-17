'use client';

import Spinner from '@/components/ui/spinner';
import { useGetAdminsQuery } from '@/redux/features/admin/adminApi';
import { useUpdateUserMutation } from '@/redux/user/userApi';
import { Badge, Box, Menu, Table, Title } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { FC } from 'react';
import { toast } from 'sonner';

interface AdminsProps {}

const Admins: FC<AdminsProps> = () => {
  const { data, isLoading } = useGetAdminsQuery('');
  const [updateUser, { isLoading: isUserUpdating }] = useUpdateUserMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const admins = (data as User[]) || [];

  const handleRemoveFromAdmin = async (user: User) => {
    try {
      await updateUser({
        ...user,
        role: 'user',
      });
      toast.success(`${user.name} is no longer an admin`);
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }

      toast.error('Something went wrong');
    }
  };

  return (
    <Box className="w-full mx-auto">
      <Title order={2} size="h1" fw={800} ta="center" mb={20}>
        Admins
      </Title>
      <Table striped highlightOnHover withTableBorder className="overflow-x">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {admins.length > 0 ? (
            (admins || []).map((user) => {
              return (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>
                    <Badge>{user.role}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Menu>
                      <Menu.Target>
                        <IconDotsVertical className=" cursor-pointer" />
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          color="red.7"
                          disabled={isUserUpdating}
                          onClick={() => handleRemoveFromAdmin(user)}
                        >
                          Remove from Admin{' '}
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              );
            })
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>No admins yet</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default Admins;
