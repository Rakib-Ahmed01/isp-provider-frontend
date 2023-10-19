import { Box, Card, SimpleGrid, Text, Title } from '@mantine/core';
import { FC } from 'react';

interface WhatWeProvideProps {}

const services = [
  {
    title: 'High-Speed Internet',
    description:
      'Enjoy high-speed internet services with lightning-fast download and upload speeds. Stream, game, work, and connect with ease.',
  },
  {
    title: 'Reliable Connections',
    description:
      'Our network is built for reliability. Stay connected without interruptions, even during peak hours.',
  },
  {
    title: '24/7 Customer Support',
    description:
      "Get the help you need anytime with our 24/7 customer support. We're here to assist you.",
  },
];

const WhatWeProvide: FC<WhatWeProvideProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        What We Provide
      </Title>
      <SimpleGrid cols={{ xs: 1, sm: 2, md: 3 }}>
        {services.map((service, index) => (
          <Card key={index} p="lg" radius="md" withBorder>
            <Title order={3} mb={10}>
              {service.title}
            </Title>
            <Text c={'dimmed'}>{service.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WhatWeProvide;
