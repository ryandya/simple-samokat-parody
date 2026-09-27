import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { persistor, store } from '@/store/store';

import { AuthProvider } from './auth-provider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const AppProviders: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <AuthProvider>
                    <SafeAreaProvider>{children}</SafeAreaProvider>
                </AuthProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);
