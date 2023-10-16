'use client';

import { useDeleteOrderMutation } from '@/redux/orders/ordersApi';
import { Badge, Menu, Table, rem } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { FC } from 'react';
import { toast } from 'sonner';

interface OrderTableRowProps {
  order: Order;
}

const OrderTableRow: FC<OrderTableRowProps> = ({ order }) => {
  const [deleteOrder, { isLoading: isOrderDeleting }] =
    useDeleteOrderMutation();

  const handleOrderDelete = async () => {
    try {
      await deleteOrder(order.id).unwrap();
      toast.success('Order canceled');
    } catch (error: any) {
      console.log(error);
      if (error.data.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }
      toast.error('Something went wrong');
    }
  };

  return (
    <Table.Tr key={order.id}>
      <Table.Td>{order.plan.title}</Table.Td>
      <Table.Td>{order.plan.price}</Table.Td>
      <Table.Td>
        <Badge color="cyan.7">{order.plan.speed}Mbps</Badge>
      </Table.Td>
      <Table.Td>
        {order.status === 'canceled' ? (
          <Badge color="red.7">{order.status}</Badge>
        ) : null}
        {order.status === 'pending' ? <Badge>{order.status}</Badge> : null}
        {order.status === 'delivered' ? (
          <Badge color="green.7">{order.status}</Badge>
        ) : null}
      </Table.Td>
      <Table.Td>{new Date(order.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        {order.status === 'pending' ? (
          <Menu>
            <Menu.Target>
              <IconDotsVertical className=" cursor-pointer" />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red.7"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                disabled={isOrderDeleting}
                onClick={handleOrderDelete}
              >
                Cancel order
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : order.status === 'delivered' ? (
          <Badge color="green.7">{order.status}</Badge>
        ) : (
          <Badge color="red.7">{order.status}</Badge>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export default OrderTableRow;
