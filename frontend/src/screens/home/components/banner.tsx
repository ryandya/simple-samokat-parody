import { useTypedNavigation } from '@/hooks';
import { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';


export const Banner: FC = () => {
    const { navigate } = useTypedNavigation()
    return (
        <View className={'mt-5 w-full bg-cyan-600 px-5 py-5 rounded-2xl justify-between flex-row'}>
            <View>
                <Text className='font-medium w-56 text-white text-xl'>
                    Доставка до 30 минут!
                </Text>
                <Pressable
                    className='bg-black py-2 rounded-full w-28 mt-4'
                    onPress={() => navigate('Explorer')}>
                    <Text className='text-white font-medium text-center'>
                        Заказать
                    </Text>
                </Pressable>
            </View>
            <View className='absolute bottom-0 right-4 w-28 h-28'>
                <Image
                    className='w-full h-full'
                    source={require('@/assets/images/courier.png')} />
            </View>
        </View>
    );
};

