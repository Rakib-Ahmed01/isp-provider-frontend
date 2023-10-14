import { Box, Skeleton, Title } from '@mantine/core';
import { FC } from 'react';

interface UpcomingEventsProps {}

const UpcomingEvents: FC<UpcomingEventsProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        Upcoming Events
      </Title>
      <Skeleton width={'100%'} h={'350px'} animate={false} />
    </Box>
  );
};

export default UpcomingEvents;
