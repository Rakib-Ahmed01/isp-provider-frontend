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
    <Box component="section" mt={'100'}>
      <Title order={2} size="h1" fw={800} ta="center" mb={25}>
        Frequently Asked Questions
      </Title>
      <Accordion radius="xs">
        {faqs.slice(0, 5).map((faq) => (
          <Accordion.Item value={faq.id} key={faq.id}>
            <Accordion.Control>
              <Text fw={600}>{faq.question}</Text>
            </Accordion.Control>
            <Accordion.Panel c={'dimmed'}>{faq.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Faqs;
