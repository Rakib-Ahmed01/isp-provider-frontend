'use client';

import { CreatePlanType, createPlanZodSchema } from '@/lib/validations/plan';
import { useAddPlanMutation } from '@/redux/features/plans/plansApi';
import {
  Box,
  Button,
  Card,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface AddPlanProps {
  params: {
    id: string;
  };
}

const AddPlan: FC<AddPlanProps> = ({ params: { id } }) => {
  const form = useForm({
    validate: zodResolver(createPlanZodSchema),
    initialValues: {
      title: '',
      price: '',
      speed: '',
      description: '',
    },
  });
  const [addPlan, { isLoading: isPlanAdding }] = useAddPlanMutation();
  const router = useRouter();

  const handleAddPlan = async (values: CreatePlanType) => {
    try {
      await addPlan({
        ...values,
        price:
          typeof values.price === 'number'
            ? values.price
            : parseInt(values.price),
        speed:
          typeof values.speed === 'number'
            ? values.speed
            : parseInt(values.speed),
      }).unwrap();
      toast.success('Plan added successfully');
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
        Add Plan
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form className="space-y-2" onSubmit={form.onSubmit(handleAddPlan)}>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Plan title"
              {...form.getInputProps('title')}
            />
            <NumberInput
              withAsterisk
              label="Price"
              placeholder="Plan price"
              min={1}
              {...form.getInputProps('price')}
            />
            <NumberInput
              withAsterisk
              label="Speed"
              min={1}
              placeholder="Plan speed"
              {...form.getInputProps('speed')}
            />
            <Textarea
              withAsterisk
              rows={4}
              maxRows={5}
              label="Description"
              placeholder="Plan description"
              {...form.getInputProps('description')}
            />
            <Button type="submit" w={'100%'} loading={isPlanAdding}>
              Add
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default AddPlan;
