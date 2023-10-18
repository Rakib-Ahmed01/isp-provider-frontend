'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { CreateBlogType, createBlogZodSchema } from '@/lib/validations/blog';
import {
  useGetABlogQuery,
  useUpdateBlogMutation,
} from '@/redux/features/blogs/blogsApi';
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

interface UpdateBlogProps {
  params: {
    id: string;
  };
}

const UpdateBlog: FC<UpdateBlogProps> = ({ params: { id } }) => {
  const { data, isLoading, isError } = useGetABlogQuery(id);
  const form = useForm({
    validate: zodResolver(createBlogZodSchema),
    initialValues: {
      title: data?.title || '',
      content: data?.content || '',
    },
  });
  const [updateBlog, { isLoading: isBlogUpdateing }] = useUpdateBlogMutation();
  const router = useRouter();

  useShallowEffect(() => {
    form.setValues({
      title: data?.title || '',
      content: data?.content || '',
    });
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="blogs" />;
  }

  const handleUpdateBlog = async (values: CreateBlogType) => {
    try {
      await updateBlog({
        ...data,
        ...values,
      }).unwrap();
      toast.success('Blog updateed successfully');
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
        Update Blog
      </Title>
      <Card withBorder className="max-w-xl mx-auto">
        <Stack>
          <form
            className="space-y-2"
            onSubmit={form.onSubmit(handleUpdateBlog)}
          >
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

            <Button type="submit" w={'100%'} loading={isBlogUpdateing}>
              Save
            </Button>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};

export default UpdateBlog;
