import { Alert, Flex } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { FC } from 'react';

interface CustomErrorProps {
  text?: string;
}

const CustomError: FC<CustomErrorProps> = ({ text }) => {
  return (
    <Flex direction={'column'} w={'100%'}>
      <Alert
        my={20}
        variant="light"
        color="red"
        title="Error"
        icon={<IconInfoCircle />}
      >
        {text ? `There was an error loading ${text}` : `There was an error`}
      </Alert>
    </Flex>
  );
};

export default CustomError;
