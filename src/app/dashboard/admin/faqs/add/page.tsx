'use client';

import { CreateFaqType, createFaqZodSchema } from '@/lib/validations/faq';
import { useAddFaqMutation } from '@/redux/features/faqs/faqsApi';
import {
  Box,
  Button,
  Card,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface AddFaqProps {
  params: {
    id: string;
  };
}

const AddFaq: FC<AddFaqProps> = ({ params: { id } }) => {
  const form = useForm({
    validate: zodResolver(createFaqZodSchema),
    initialValues: {
      question: '',
      answer: '',
    },
  });
  const [addFaq, { isLoading: isFaqAdding }] = useAddFaqMutation();
  const router = useRouter();

  const handleAddFaq = async (values: CreateFaqType) => {
    try {
      await addFaq({
        ...values,
      }).unwrap();
      toast.success('Faq added successfully');
      router.push('/dashboard/admin/faqs');
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
        Add Faq
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form className="space-y-2" onSubmit={form.onSubmit(handleAddFaq)}>
            <TextInput
              withAsterisk
              label="Question"
              placeholder="Faq question"
              {...form.getInputProps('question')}
            />

            <Textarea
              rows={4}
              maxRows={5}
              withAsterisk
              label="Answer"
              placeholder="Faq answer"
              {...form.getInputProps('answer')}
            />

            <Button type="submit" w={'100%'} loading={isFaqAdding}>
              Add
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default AddFaq;
