'use client';

import { Menu } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { FC } from 'react';

interface UpdateDeleteMenuProps {}

const UpdateDeleteMenu: FC<UpdateDeleteMenuProps> = () => {
  return (
    <Menu>
      <Menu.Target>
        <IconDotsVertical cursor={'pointer'} width={20} height={20} />
      </Menu.Target>
      <Menu.Dropdown w={80}>
        <Menu.Item>Update</Menu.Item>
        <Menu.Item color="red.7">Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UpdateDeleteMenu;
