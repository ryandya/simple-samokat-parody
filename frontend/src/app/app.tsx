import { Toast } from '@/components/ui';
import Navigation from '@/navigation/navigation';
import { StatusBar } from 'expo-status-bar';

import { AppProviders } from './providers/app-providers';

export default function App() {
    return (
        <AppProviders>
            <Navigation />
            <StatusBar style='light' />
            <Toast />
        </AppProviders>
    );
}
