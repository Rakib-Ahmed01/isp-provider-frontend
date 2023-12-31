'use client';

import { useGetPlansQuery } from '@/redux/features/plans/plansApi';
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import CustomError from '../custom-error';

interface PlansProps {}

const Plans: FC<PlansProps> = () => {
  const { isLoading, data, isError } = useGetPlansQuery({ size: 3, page: 1 });

  if (isLoading) {
    return (
      <Box component="section" mt={'50'}>
        <Title order={1} className="text-center" my={25}>
          Plans
        </Title>
        <SimpleGrid
          cols={{ xs: 1, sm: 2, md: 3 }}
          spacing={{ xs: 15, md: 30 }}
          verticalSpacing={{ xs: 15, md: 30 }}
        >
          {Array(3)
            .fill(0)
            .map((_, index) => {
              return (
                <Paper withBorder key={index}>
                  <Stack gap={'sm'}>
                    <Skeleton h={350} animate={false} />
                  </Stack>
                </Paper>
              );
            })}
        </SimpleGrid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box component="section" mt={'45'}>
        <Title order={1} className="text-center" my={25}>
          Plans
        </Title>
        <CustomError text="plans" />
      </Box>
    );
  }

  const plans = (data?.data as Plan[]) || [];

  return (
    <Box component="section" mt={'45'}>
      <Title order={1} className="text-center" my={25}>
        Plans
      </Title>
      <SimpleGrid
        cols={{ xs: 1, sm: 2, md: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {plans.map((plan) => {
          return (
            <Paper withBorder key={plan.id}>
              <Stack gap={'sm'}>
                <Skeleton h={'200'} animate={false} />
                <Box p={'xs'}>
                  <Group justify="space-between">
                    <Flex align={'center'} gap={5}>
                      <Title order={3}>{plan.title}</Title>
                      <Badge variant="light">{plan.speed}Mbps</Badge>
                    </Flex>
                    <Badge variant="filled">{plan.price}BDT</Badge>
                  </Group>
                  <Text c={'dimmed'} className="line-clamp-3">
                    {plan.description}
                  </Text>
                  <Button
                    component={Link}
                    href={`/plans/${plan.id}`}
                    w={'100%'}
                    mt={'sm'}
                    variant="light"
                  >
                    View Details
                  </Button>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Plans;
