'use client';

import {
  Badge,
  Box,
  Button,
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

interface ServicesProps {}

const Services: FC<ServicesProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        Services
      </Title>
      <SimpleGrid
        cols={{ xs: 1, sm: 2, md: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return (
              <Paper withBorder key={index}>
                <Stack gap={'sm'}>
                  <Skeleton h={'200'} animate={false} />
                  <Box p={'xs'}>
                    <Group justify="space-between">
                      <Title order={3}>Service {index + 1}</Title>
                      <Badge variant="filled">${index + 1}00</Badge>
                    </Group>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequatur quisquam odit modi ipsa. Minima, ducimus.
                      Minima cum, corporis eligendi ipsum nostrum saepe,
                      deserunt voluptatem fuga tenetur molestias optio magnam
                      magni tempora.
                    </Text>
                    <Button
                      component={Link}
                      href={`/services/${index + 1}`}
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

export default Services;
