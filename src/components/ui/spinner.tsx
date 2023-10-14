import { Flex, Loader } from '@mantine/core';
import { FC } from 'react';

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = () => {
  return (
    <Flex w={'95vw'} h={'90vh'} justify={'center'} align={'center'}>
      <Loader />
    </Flex>
  );
};

export default Spinner;
