'use client';

import Spinner from '@/components/ui/spinner';
import { useUser } from '@/hooks/useUser';
import {
  CreateReviewType,
  createReviewZodSchema,
} from '@/lib/validations/review';
import { useGetPlanQuery } from '@/redux/features/plans/plansApi';
import { useCreateReviewMutation } from '@/redux/features/reviews/reviewsApi';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Paper,
  Rating,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface PlanProps {
  params: {
    planId: string;
  };
}

const Plan: FC<PlanProps> = ({ params: { planId } }) => {
  const { isLoading, data } = useGetPlanQuery(planId);
  const [createReview, { isLoading: isCreateReviewLoading }] =
    useCreateReviewMutation();
  const user = useUser();
  const form = useForm({
    validate: zodResolver(createReviewZodSchema),
    initialValues: {
      rating: '',
      comment: '',
    },
  });
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  const plan = data as Plan;

  console.log({ plan });

  const handleCreateReview = async (values: CreateReviewType) => {
    try {
      console.log({ values });
      await createReview({
        comment: values.comment,
        rating: +values.rating,
        planId,
      }).unwrap();
      toast.success('Thank you for your review ❤');
      form.reset();
      router.refresh();
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }
      toast.error('Something went wrong');
    }
  };

  return (
    <main>
      <Stack gap={20} className="max-w-2xl mx-auto">
        <Paper withBorder>
          <Stack gap={'sm'}>
            <Skeleton h={250} animate={false} />
            <Box p={'xs'}>
              <Group justify="space-between">
                <Flex align={'center'} gap={5}>
                  <Title order={3}>{plan.title}</Title>
                  <Badge variant="light">{plan.speed}Mbps</Badge>
                </Flex>
                <Badge variant="filled">{plan.price}BDT</Badge>
              </Group>
              <Text>{plan.description}</Text>
              <Button w={'100%'} mt={'sm'} variant="filled">
                Buy now
              </Button>
            </Box>
          </Stack>
        </Paper>
        <Group mt={'lg'}>
          <Title order={3} fw={400} fz={26}>
            Reviews
          </Title>
        </Group>
        <ScrollArea>
          <Card shadow="xs" padding="lg" radius="md" withBorder>
            <form onSubmit={form.onSubmit(handleCreateReview)}>
              <TextInput
                placeholder="rating"
                {...form.getInputProps('rating')}
                withAsterisk
              />
              <Textarea
                placeholder="your review"
                my={10}
                {...form.getInputProps('comment')}
                withAsterisk
              />

              {user.name ? (
                <Button type="submit" loading={isCreateReviewLoading}>
                  Add Review
                </Button>
              ) : (
                <Button component={Link} href={'/login'}>
                  Login to add review
                </Button>
              )}
            </form>

            {plan.reviews.length ? (
              <Box mt={10}>
                {plan.reviews.map((review) => {
                  return (
                    <Card withBorder key={review.id} mt={16}>
                      <Flex align={'center'} gap={5}>
                        <Avatar src={review.user.profileImg} ml={5}></Avatar>
                        <Box>
                          <Text fw={500}>{review.user.name}</Text>
                          <Rating value={review.rating} readOnly />
                        </Box>
                      </Flex>
                      <Text ml={12} mt={8}>
                        {review.comment}
                      </Text>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <Center mt={10}>
                <Text>No reviews yet</Text>
              </Center>
            )}
          </Card>
        </ScrollArea>
      </Stack>
    </main>
  );
};

export default Plan;
