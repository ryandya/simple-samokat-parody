import { useProfile, useTypedNavigation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

export const HeaderProfile: FC = () => {
    const { profile } = useProfile()
    const { navigate } = useTypedNavigation()

    return (
        <View className={'flex-row justify-between items-center'}>
            <Text className='font-medium text-2xl'>Привет, {profile?.name}!</Text>

            <Pressable onPress={() => navigate('Cart')}>
                <Ionicons name='cart' size={26} color={'#374151'}/>
            </Pressable>
        </View>
    );
};

