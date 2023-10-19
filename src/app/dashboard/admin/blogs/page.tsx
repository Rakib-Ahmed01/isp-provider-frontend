'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from '@/redux/features/blogs/blogsApi';
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface BlogsProps {}

const Blogs: FC<BlogsProps> = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery('');
  const router = useRouter();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="blogs" />;
  }

  const blogs = (data as Blog[]) || [];

  const handleBlogDelete = async (blog: Blog) => {
    const confirmed = confirm(
      `Are you sure you want to delete $${blog.title}?`
    );
    if (confirmed) {
      try {
        await deleteBlog(blog.id).unwrap();
        toast.success(`Blog deleted successfully`);
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
    <Box mx={'auto'}>
      <Title order={2} size="h1" fw={800} ta="center" mb={25}>
        Blogs
      </Title>

      <Group justify="end" mb={15}>
        <Link href={'/dashboard/admin/blogs/add'}>
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
        {blogs.map((blog) => (
          <Card key={blog.id} withBorder className="space-y-3">
            <Flex justify={'space-between'} align={'center'}>
              <Title order={4} fw={600}>
                {blog.title}
              </Title>
              <Menu>
                <Menu.Target>
                  <IconDotsVertical cursor={'pointer'} width={20} height={20} />
                </Menu.Target>
                <Menu.Dropdown w={80}>
                  <Menu.Item
                    onClick={() =>
                      router.push(`/dashboard/admin/blogs/update/${blog.id}`)
                    }
                  >
                    Update
                  </Menu.Item>
                  <Menu.Item
                    color="red.7"
                    onClick={() => handleBlogDelete(blog)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
            <Text c={'dimmed'}>{blog.content.slice(0, 200)}...</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Blogs;
