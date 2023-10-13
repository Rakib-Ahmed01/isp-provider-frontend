'use client';

import { store } from '@/redux/store';
import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Provider store={store}>
        <Toaster richColors={true} />
        {children}
      </Provider>
    </MantineProvider>
  );
};

export default Providers;
