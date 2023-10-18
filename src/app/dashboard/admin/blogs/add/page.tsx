'use client';

import { CreateBlogType, createBlogZodSchema } from '@/lib/validations/blog';
import { useAddBlogMutation } from '@/redux/features/blogs/blogsApi';
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

interface AddBlogProps {
  params: {
    id: string;
  };
}

const AddBlog: FC<AddBlogProps> = ({ params: { id } }) => {
  const form = useForm({
    validate: zodResolver(createBlogZodSchema),
    initialValues: {
      title: '',
      content: '',
    },
  });
  const [addBlog, { isLoading: isBlogAdding }] = useAddBlogMutation();
  const router = useRouter();

  const handleAddBlog = async (values: CreateBlogType) => {
    try {
      await addBlog({
        ...values,
      }).unwrap();
      toast.success('Blog added successfully');
      router.push('/dashboard/admin/blogs');
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
        Add Blog
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form className="space-y-2" onSubmit={form.onSubmit(handleAddBlog)}>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Blog title"
              {...form.getInputProps('title')}
            />

            <Textarea
              rows={4}
              maxRows={5}
              withAsterisk
              label="Content"
              placeholder="Blog content"
              {...form.getInputProps('content')}
            />

            <Button type="submit" w={'100%'} loading={isBlogAdding}>
              Add
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default AddBlog;
