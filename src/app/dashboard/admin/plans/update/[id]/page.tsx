'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { updatePlanZodSchema } from '@/lib/validations/plan';
import {
  useGetPlanQuery,
  useUpdatePlanMutation,
} from '@/redux/features/plans/plansApi';
import {
  Box,
  Button,
  Card,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface UpdatePlanProps {
  params: {
    id: string;
  };
}

const UpdatePlan: FC<UpdatePlanProps> = ({ params: { id } }) => {
  const { data, isLoading, isError } = useGetPlanQuery(id);
  const form = useForm({
    validate: zodResolver(updatePlanZodSchema),
    initialValues: {
      title: data?.title || '',
      price: data?.price || '',
      speed: data?.speed || '',
      description: data?.description || '',
      isAvailable: data?.isAvailable || false || '',
    },
  });
  const [updatePlan, { isLoading: isPlanUpdating }] = useUpdatePlanMutation();
  const router = useRouter();

  useShallowEffect(() => {
    if (data) {
      form.setValues({
        title: data.title,
        price: data.price,
        speed: data.speed,
        description: data.description,
        isAvailable: data.isAvailable ? 'true' : 'false',
      });
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="plan" />;
  }

  const plan = data as Plan;

  const handleUpdatePlan = async (values: any) => {
    try {
      await updatePlan({
        id: plan.id,
        ...values,
        isAvailable: values.isAvailable === 'true',
        price:
          typeof values.price === 'number'
            ? values.price
            : parseInt(values.price),
        speed:
          typeof values.speed === 'number'
            ? values.speed
            : parseInt(values.speed),
      }).unwrap();
      toast.success('Plan updated successfully');
      router.push('/dashboard/admin/plans');
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }
      toast.error('Something went wrong');
    }
  };

  return (
    <Box className="w-full mx-auto">
      <Title order={2} size="h1" fw={800} ta="center" mb={20}>
        Update Plan
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form
            className="space-y-2"
            onSubmit={form.onSubmit(handleUpdatePlan)}
          >
            <TextInput label="Title" {...form.getInputProps('title')} />
            <NumberInput
              min={1}
              label="Price"
              {...form.getInputProps('price')}
            />
            <NumberInput
              min={1}
              label="Speed"
              {...form.getInputProps('speed')}
            />
            <Select
              label="isAvailable"
              data={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              {...form.getInputProps('isAvailable')}
            />
            <Textarea
              rows={4}
              maxRows={5}
              label="Description"
              {...form.getInputProps('description')}
            />
            <Button type="submit" w={'100%'} loading={isPlanUpdating}>
              Save
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default UpdatePlan;
