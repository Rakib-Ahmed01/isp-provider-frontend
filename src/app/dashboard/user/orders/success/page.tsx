'use client';

import Spinner from '@/components/ui/spinner';
import { useCreateOrederMutation } from '@/redux/features/orders/ordersApi';
import { useShallowEffect } from '@mantine/hooks';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

interface CreateOrderProps {}

const CreateOrder: FC<CreateOrderProps> = () => {
  const [createOrder] = useCreateOrederMutation();
  const userId = useSearchParams().get('userId');
  const planId = useSearchParams().get('planId');
  const router = useRouter();

  useShallowEffect(() => {
    if (!userId || !planId) {
      return router.push('/');
    }

    (async () => {
      try {
        console.log('actually create order');
        await createOrder({
          planId,
          userId,
        }).unwrap();
        toast.success('Order created successfully');
        return router.push('/dashboard/user/orders');
      } catch (error) {
        console.log({ error });
        toast.error('Failed to create order');
        return router.push('/');
      }
    })();
  }, [userId, planId, createOrder, router]);

  if (!userId || !planId) {
    return redirect('/');
  }

  return <Spinner />;
};

export default CreateOrder;
