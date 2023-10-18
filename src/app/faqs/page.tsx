'use client';

import CustomError from '@/components/ui/custom-error';
import Spinner from '@/components/ui/spinner';
import { useGetAllFaqsQuery } from '@/redux/features/faqs/faqsApi';
import { Accordion, Box, Text, Title } from '@mantine/core';
import { FC } from 'react';

interface FaqsProps {}

const Faqs: FC<FaqsProps> = () => {
  const { data, isLoading, isError } = useGetAllFaqsQuery('');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <CustomError text="faqs" />;
  }

  const faqs = (data as Faq[]) || [];

  return (
    <Box className="max-w-3xl" mx={'auto'} mb={20}>
      <Title order={2} size="h1" fw={800} ta="center" mb={25}>
        Frequently Asked Questions
      </Title>
      <Accordion radius="xs">
        {faqs.map((faq) => (
          <Accordion.Item value={faq.id} key={faq.id}>
            <Accordion.Control>
              <Text fw={600} c={'blue.6'}>
                {faq.question}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>{faq.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Faqs;
