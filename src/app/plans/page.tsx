'use client';

import { useGetPlansQuery } from '@/redux/features/services/plansApi';
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  RangeSlider,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { FC, useState } from 'react';

interface PlansProps {}

const Plans: FC<PlansProps> = () => {
  const { isLoading, data } = useGetPlansQuery(10000);
  const [opened, { open, close }] = useDisclosure(false);
  const [[minPrice, maxPrice], setPrice] = useState<[number, number]>([
    0, 4000,
  ]);
  const [[minSpeed, maxSpeed], setSpeed] = useState<[number, number]>([0, 100]);
  const [searchText, setSearchText] = useState<string>('');

  if (isLoading) {
    return (
      <Box component="section" mt={'50'}>
        <SimpleGrid
          cols={{ xs: 1, sm: 2, md: 3 }}
          spacing={{ xs: 15, md: 30 }}
          verticalSpacing={{ xs: 15, md: 30 }}
        >
          {Array(9)
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

  const plans = data as Plan[];

  const filteredPlans = plans.filter((plan) => {
    return (
      plan.title.toLowerCase().includes(searchText.toLowerCase()) &&
      plan.price >= minPrice &&
      plan.price <= maxPrice &&
      plan.speed >= minSpeed &&
      plan.speed <= maxSpeed
    );
  });

  return (
    <Box component="section">
      <Modal opened={opened} onClose={close}>
        <Stack gap={15} mb={15}>
          <Box>
            <Text>Filter by name</Text>
            <TextInput
              placeholder="Search plan by name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>
          <Box>
            <Text>Filter by price</Text>
            <RangeSlider
              thumbSize={10}
              max={4000}
              min={0}
              onChange={(value) => setPrice(value)}
              defaultValue={[minPrice, maxPrice]}
            />
          </Box>

          <Box>
            <Text>Filter by speed</Text>
            <RangeSlider
              thumbSize={10}
              max={100}
              min={0}
              onChange={(value) => setSpeed(value)}
              defaultValue={[minSpeed, maxSpeed]}
            />
          </Box>
        </Stack>
        <Button
          onClick={() => {
            close();
            setSearchText('');
            setPrice([0, 4000]);
            setSpeed([0, 100]);
          }}
          w={'100%'}
          color="red.5"
          variant="outline"
        >
          Clear filter
        </Button>
      </Modal>

      <Flex justify={'end'} mb={15}>
        <Button onClick={open}>Filters</Button>
      </Flex>

      <SimpleGrid
        cols={{ xs: 1, sm: 2, md: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {filteredPlans.length === 0 ? (
          <Text>No plans found</Text>
        ) : (
          filteredPlans.map((plan) => {
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
                    <Text>{plan.description}</Text>
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
          })
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Plans;