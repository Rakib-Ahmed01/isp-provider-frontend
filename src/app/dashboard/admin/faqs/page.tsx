'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import {
  useDeleteFaqMutation,
  useGetAllFaqsQuery,
} from '@/redux/features/faqs/faqsApi';
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

interface FaqsProps {}

const Faqs: FC<FaqsProps> = () => {
  const { data, isLoading, isError } = useGetAllFaqsQuery('');
  const router = useRouter();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="faqs" />;
  }

  const faqs = (data as Faq[]) || [];

  const handleFaqDelete = async (faq: Faq) => {
    const confirmed = confirm(`Are you sure you want to delete this question?`);
    if (confirmed) {
      try {
        await deleteFaq(faq.id).unwrap();
        toast.success(`Question deleted successfully`);
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
        Frequently Asked Questions
      </Title>

      <Group justify="end" mb={15}>
        <Link href={'/dashboard/admin/faqs/add'}>
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
        {faqs.map((faq) => (
          <Card key={faq.id} withBorder className="space-y-2">
            <Flex justify={'space-between'} align={'center'}>
              <Title order={4} fw={600} c={'blue.7'}>
                {faq.question}
              </Title>
              <Menu>
                <Menu.Target>
                  <IconDotsVertical cursor={'pointer'} width={20} height={20} />
                </Menu.Target>
                <Menu.Dropdown w={80}>
                  <Menu.Item
                    onClick={() =>
                      router.push(`/dashboard/admin/faqs/update/${faq.id}`)
                    }
                  >
                    Update
                  </Menu.Item>
                  <Menu.Item
                    color="red.7"
                    onClick={() => handleFaqDelete(faq)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
            <Text>{faq.answer}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Faqs;
