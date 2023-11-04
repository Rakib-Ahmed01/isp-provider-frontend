'use client';

import { useGetAllReviewsQuery } from '@/redux/features/reviews/reviewsApi';
import { Carousel } from '@mantine/carousel';
import { Box, Rating, Skeleton, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { FC } from 'react';
import CustomError from '../custom-error';

interface ClientReviewsProps {}

const ClientReviews: FC<ClientReviewsProps> = () => {
  const { data, isLoading, isError } = useGetAllReviewsQuery('');

  if (isLoading) {
    return (
      <Box component="section" mt={'100'}>
        <Title order={1} className="text-center" my={25}>
          Client Reviews
        </Title>
        <Skeleton width={'100%'} h={'350px'} animate={false} />
      </Box>
    );
  }

  if (isError) {
    return <CustomError />;
  }

  const reviews = (data as Review[]) || [];

  return (
    <Box component="section" mt={'100'}>
      <Title order={1} className="text-center" my={25}>
        Client Reviews
      </Title>
      <Carousel loop withIndicators height={250}>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <Carousel.Slide
                key={review.id}
                p="lg"
                className="flex flex-col justify-center items-center gap-5"
              >
                <Stack justify="center" align="center" gap={2}>
                  <Image
                    src={review.user.profileImg}
                    width={30}
                    height={30}
                    priority={true}
                    alt={review.user.name}
                    className="rounded-full"
                  />
                  <Text>{review.user.name}</Text>
                </Stack>
                <Rating value={review.rating} readOnly />
                <Text>{review.comment}</Text>
              </Carousel.Slide>
            );
          })
        ) : (
          <Text>No Reviews yet</Text>
        )}
      </Carousel>
    </Box>
  );
};

export default ClientReviews;
