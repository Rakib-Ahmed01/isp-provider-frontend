'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetAllFeedbacksQuery } from '@/redux/features/feedback/feedbackApi';
import { Box, Card, Flex, Group, SimpleGrid, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface FeedbacksProps {}

const Feedbacks: FC<FeedbacksProps> = () => {
  const { data, isLoading, isError } = useGetAllFeedbacksQuery('');
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="feedbacks" />;
  }

  const feedbacks = (data || []) as Feedback[];

  return (
    <Box mx={'auto'}>
      <Title order={2} size="h1" fw={800} ta="center" mb={25}>
        Feedbacks
      </Title>

      <SimpleGrid
        cols={{ xs: 1, md: 2, xl: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} withBorder className="space-y-3">
            <Group>
              <Image
                src={feedback.user.profileImg}
                width={30}
                height={30}
                priority={true}
                alt={feedback.user.name}
              />
              <Flex direction="column">
                <Text>{feedback.user.name}</Text>
                <Text>{feedback.user.email}</Text>
              </Flex>
            </Group>
            <Title order={4} fw={600} c={'blue.7'}>
              {feedback.subject}
            </Title>
            <Text>{feedback.comment}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Feedbacks;
