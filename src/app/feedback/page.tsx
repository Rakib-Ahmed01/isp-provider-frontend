'use client';

import Unauthorized from '@/components/ui/unauthrized';
import { useUser } from '@/hooks/useUser';
import {
  CreateFeedbackInput,
  createFeedbackZodSchema,
} from '@/lib/validations/feedback';
import { useCreateFeedbackMutation } from '@/redux/features/feedback/feedbackApi';
import { Box, Button, Group, TextInput, Textarea, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Feedback() {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  const user = useUser();
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(createFeedbackZodSchema),
    initialValues: {
      subject: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (!user.name) {
      router.push('/login');
    }
  }, [router, user]);

  if (!user.name) {
    return <Unauthorized />;
  }

  const handleSubmit = async (values: CreateFeedbackInput) => {
    try {
      await createFeedback({ ...values, userId: user?.id }).unwrap();
      toast.success('Thank you for your feedback ❤');
      form.reset();
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors && error.data.errors[0].message) {
        return toast.error(error.data.errors[0].message);
      }
      toast.error('Something went wrong');
    }
  };

  return (
    <Box className="max-w-3xl" mx={'auto'}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={2} size="h1" fw={800} ta="center">
          Give us feedback
        </Title>

        <TextInput
          withAsterisk
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
        />
        <Textarea
          withAsterisk
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('comment')}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="sm" loading={isLoading}>
            Feedback
          </Button>
        </Group>
      </form>
    </Box>
  );
}
