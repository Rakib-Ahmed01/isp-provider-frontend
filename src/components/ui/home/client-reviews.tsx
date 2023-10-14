import { Box, Skeleton, Title } from '@mantine/core';
import { FC } from 'react';

interface ClientReviewsProps {}

const ClientReviews: FC<ClientReviewsProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        Client Reviews
      </Title>
      <Skeleton width={'100%'} h={'350px'} animate={false} />
    </Box>
  );
};

export default ClientReviews;
