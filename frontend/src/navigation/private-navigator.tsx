import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootStackParamList } from './navigation.types';
import { routes } from './routes';
import { useAuth } from '@/hooks/use-auth';
import Auth from '@/screens/auth/auth-screen';

interface Props {
    className?: string;
}
const Stack = createNativeStackNavigator<TypeRootStackParamList>()

export const PrivateNavigator: FC<Props> = ({ className }) => {
    const { user } = useAuth()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#fff'
                }
            }}>
            {user ?
                (routes.map(route => (
                    <Stack.Screen key={route.name}
                        {...route} />
                ))
                ) : (
                    <Stack.Screen name='Auth' component={Auth} />
                )
            }
        </Stack.Navigator>
    );
};

