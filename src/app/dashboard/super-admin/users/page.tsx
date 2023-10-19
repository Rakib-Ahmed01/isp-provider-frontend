'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetUsersQuery } from '@/redux/features/admin/adminApi';
import { useUpdateUserMutation } from '@/redux/features/user/userApi';
import { Badge, Box, Menu, Table, Title } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { FC } from 'react';
import { toast } from 'sonner';

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const { data, isLoading, isError: isGetUsersError } = useGetUsersQuery('');
  const [updateUser, { isLoading: isUserUpdating }] = useUpdateUserMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (isGetUsersError) {
    return <CustomError text="users" />;
  }

  const users = (data as User[]) || [];

  const handleAddToAdmin = async (user: User) => {
    try {
      await updateUser({
        ...user,
        role: 'admin',
      }).unwrap();
      toast.success(`${user.name} is now an admin`);
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }

      toast.error('Something went wrong');
    }
  };

  const handleBanOrUnbanUser = async (status: boolean, userId: string) => {
    try {
      await updateUser({
        isBanned: status,
        id: userId,
      }).unwrap();
      toast.success(`${!status ? 'Unbanned' : 'Banned'} User`);
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
        Users
      </Title>
      <Table striped highlightOnHover withTableBorder className="overflow-x">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.length > 0 ? (
            (users || []).map((user) => {
              return (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>
                    <Badge>{user.role}</Badge>
                  </Table.Td>
                  <Table.Td>
                    {user.isBanned ? (
                      <Badge color="red.7">Banned</Badge>
                    ) : (
                      <Badge color="green.7">Active</Badge>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Menu>
                      <Menu.Target>
                        <IconDotsVertical className=" cursor-pointer" />
                      </Menu.Target>
                      <Menu.Dropdown>
                        {user.isBanned ? (
                          <Menu.Item
                            onClick={() => handleBanOrUnbanUser(false, user.id)}
                            disabled={isUserUpdating}
                            color="green.7"
                          >
                            Unban User
                          </Menu.Item>
                        ) : (
                          <>
                            <Menu.Item
                              onClick={() => handleAddToAdmin(user)}
                              disabled={isUserUpdating}
                            >
                              Make Admin
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                handleBanOrUnbanUser(true, user.id)
                              }
                              disabled={isUserUpdating}
                              color="red.7"
                            >
                              Ban User
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              );
            })
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>No users yet</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default Users;
