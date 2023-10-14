import { Box, SimpleGrid, Skeleton, Title } from '@mantine/core';
import { FC } from 'react';

interface WhatWeProvideProps {}

const WhatWeProvide: FC<WhatWeProvideProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        What We Provide
      </Title>
      <SimpleGrid cols={{ xs: 1, sm: 2, md: 3 }}>
        <Skeleton width={'100%'} h={'350px'} animate={false} />
        <Skeleton width={'100%'} h={'350px'} animate={false} />
        <Skeleton width={'100%'} h={'350px'} animate={false} />
      </SimpleGrid>
    </Box>
  );
};

export default WhatWeProvide;
