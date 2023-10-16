'use client';

import OrderTableRow from '@/components/ui/order-table-row';
import Spinner from '@/components/ui/spinner';
import { useGetOrdersByUserQuery } from '@/redux/orders/ordersApi';
import { Box, Table, Title } from '@mantine/core';
import { FC } from 'react';

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const { data, isLoading } = useGetOrdersByUserQuery('');

  if (isLoading) {
    return <Spinner />;
  }

  const orders = (data as Order[]) || [];

  return (
    <Box className="w-full mx-auto">
      <Title order={2} size="h1" fw={800} ta="center" mb={20}>
        Orders
      </Title>
      <Table striped highlightOnHover withTableBorder className="overflow-x">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Plan</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Speed</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Order Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.length > 0 ? (
            (orders || []).map((order) => {
              return <OrderTableRow key={order.id} order={order} />;
            })
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>No orders yet</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default Orders;
