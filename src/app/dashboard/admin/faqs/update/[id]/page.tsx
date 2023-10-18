'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { CreateFaqType, createFaqZodSchema } from '@/lib/validations/faq';
import {
  useGetAFaqQuery,
  useUpdateFaqMutation,
} from '@/redux/features/faqs/faqsApi';
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
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface UpdateFaqProps {
  params: {
    id: string;
  };
}

const UpdateFaq: FC<UpdateFaqProps> = ({ params: { id } }) => {
  const { data, isLoading, isError } = useGetAFaqQuery(id);
  const form = useForm({
    validate: zodResolver(createFaqZodSchema),
    initialValues: {
      question: data?.question || '',
      answer: data?.answer || '',
    },
  });
  const [updateFaq, { isLoading: isFaqUpdateing }] = useUpdateFaqMutation();
  const router = useRouter();

  useShallowEffect(() => {
    form.setValues({
      question: data?.question || '',
      answer: data?.answer || '',
    });
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="faqs" />;
  }

  const handleUpdateFaq = async (values: CreateFaqType) => {
    try {
      await updateFaq({
        ...data,
        ...values,
      }).unwrap();
      toast.success('Faq updateed successfully');
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
        Update Faq
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form className="space-y-2" onSubmit={form.onSubmit(handleUpdateFaq)}>
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

            <Button type="submit" w={'100%'} loading={isFaqUpdateing}>
              Save
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default UpdateFaq;
