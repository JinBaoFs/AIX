'use client'

import theme from '@w/theme/themeConfig';
import { useLocale } from 'next-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { EmotionCacheProvider } from '@w/components/EmmotionCacheProvider';
import { WagmiProvider } from 'wagmi';
import { config } from '@w/constants/wagmi';
import { RainbowKitProvider, Locale } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Header from '@w/components/Header';
import BottomNav from '@w/components/BottomNav';
import { NavProvider } from '@w/context/navContext';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@w/store/store';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const locale = useLocale();

  return (
    <EmotionCacheProvider>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider locale={locale as Locale}>
                  <NavProvider>
                    <Header />
                    {children}
                    <BottomNav />
                  </NavProvider>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </PersistGate>
        </ReduxProvider>
      </ChakraProvider>
    </EmotionCacheProvider>
  );
};

export default Provider;
