'use client';

import CustomError from '@/components/ui/custom-error';
import {
  useDeletePlanMutation,
  useGetPlansQuery,
} from '@/redux/features/plans/plansApi';
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface PlansProps {}

const Plans: FC<PlansProps> = () => {
  const { isLoading, data, isError } = useGetPlansQuery(10000);
  const router = useRouter();
  const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();

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

  if (isError) {
    return <CustomError text="plans" />;
  }

  const plans = data as Plan[];

  const handlePlanDelete = async (plan: Plan) => {
    const confirmed = confirm(`Are you sure you want to delete ${plan.title}?`);
    if (confirmed) {
      try {
        await deletePlan(plan.id);
        toast.success(`${plan.title} deleted successfully`);
      } catch (error: any) {
        console.log(error);
        if (error?.data?.errors && error.data.errors[0].message) {
          return toast.error(error.data.errors[0].message);
        }
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <Box component="section">
      <Title order={1} className="text-center" mb={25}>
        Plans
      </Title>
      <Group justify="end" mb={15}>
        <Link href={'/dashboard/admin/plans/add'}>
          <Button variant="light">
            <IconPlus className="w-4 h-4" />
            Add
          </Button>
        </Link>
      </Group>
      <SimpleGrid
        cols={{ xs: 1, md: 2, xl: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {plans.length === 0 ? (
          <Text>No plans found</Text>
        ) : (
          plans.map((plan) => {
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
                      <Flex justify={'center'} align={'center'} gap="2">
                        <Badge variant="filled">{plan.price}BDT</Badge>
                        <Menu>
                          <Menu.Target>
                            <IconDotsVertical
                              cursor={'pointer'}
                              width={20}
                              height={20}
                            />
                          </Menu.Target>
                          <Menu.Dropdown w={80}>
                            <Menu.Item
                              onClick={() =>
                                router.push(
                                  `/dashboard/admin/plans/update/${plan.id}`
                                )
                              }
                            >
                              Update
                            </Menu.Item>
                            <Menu.Item
                              color="red.7"
                              onClick={() => handlePlanDelete(plan)}
                              disabled={isDeleting}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Flex>
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
