import { Box, SimpleGrid, Skeleton, Title } from '@mantine/core';
import { FC } from 'react';

interface RecentBlogsProps {}

const RecentBlogs: FC<RecentBlogsProps> = () => {
  return (
    <Box component="section" mt={'50'}>
      <Title order={1} className="text-center" my={25}>
        Recent Blogs
      </Title>
      <SimpleGrid cols={{ xs: 1, sm: 2, md: 3 }}>
        <Skeleton width={'100%'} h={'350px'} animate={false} />
        <Skeleton width={'100%'} h={'350px'} animate={false} />
        <Skeleton width={'100%'} h={'350px'} animate={false} />
      </SimpleGrid>
    </Box>
  );
};

export default RecentBlogs;
