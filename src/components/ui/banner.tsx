import { Skeleton } from '@mantine/core';
import { FC } from 'react';

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  return <Skeleton width={'100%'} h={'500px'} animate={false} />;
};

export default Banner;
