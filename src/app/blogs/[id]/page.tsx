'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetABlogQuery } from '@/redux/features/blogs/blogsApi';
import { Card, Text, Title } from '@mantine/core';
import { FC } from 'react';

interface BlogProps {
  params: {
    id: string;
  };
}

const Blog: FC<BlogProps> = ({ params: { id } }) => {
  const { data, isLoading, isError } = useGetABlogQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="blog" />;
  }

  const blog = (data as Blog) || {};

  return (
    <Card withBorder component="section" className="max-w-3xl mx-auto">
      <Title mb={20}>{blog.title}</Title>
      <Text c={'dimmed'}>{blog.content}</Text>
    </Card>
  );
};

export default Blog;
