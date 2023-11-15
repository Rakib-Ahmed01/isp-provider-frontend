'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetAllBlogsQuery } from '@/redux/features/blogs/blogsApi';
import { Box, Card, SimpleGrid, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

interface BlogsProps {}

const Blogs: FC<BlogsProps> = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery('');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="blogs" />;
  }

  const blogs = (data as Blog[]) || [];

  return (
    <Box component="section" my={'100'}>
      <Title order={2} size="h1" fw={800} ta="center" mb={25}>
        Blogs
      </Title>
      <SimpleGrid
        cols={{ xs: 1, sm: 2, lg: 3 }}
        spacing={{ xs: 15, md: 30 }}
        verticalSpacing={{ xs: 15, md: 30 }}
      >
        {blogs.length === 0 ? (
          <Text>No blogs found</Text>
        ) : (
          blogs.slice(0, 3).map((blog) => {
            return (
              <Card
                withBorder
                key={blog.id}
                className="space-y-4"
                component={Link}
                href={`/blogs/${blog.id}`}
              >
                <Title order={3}>{blog.title}</Title>
                <Text c={'dimmed'} className="line-clamp-3">
                  {blog.content.slice(0, 200)}...
                </Text>
                {/* <Button
                  variant="light"
                  component={Link}
                  href={`/blogs/${blog.id}`}
                >
                  Read more
                </Button> */}
              </Card>
            );
          })
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Blogs;
