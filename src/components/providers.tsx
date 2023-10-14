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
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark" withCssVariables>
        <Toaster richColors={true} />
        {children}
      </MantineProvider>
    </Provider>
  );
};

export default Providers;
