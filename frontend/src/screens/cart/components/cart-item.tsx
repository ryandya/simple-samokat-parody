import { useTypedNavigation } from '@/hooks';
import { ICartItem } from '@/types/cart.interface';
import { ConvertPrice } from '@/utils/convert-price';
import { getMediaSource } from '@/utils/get-media-source';
import { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { CartActions } from './cart-actions';

interface ICartItemProps {
    item: ICartItem
}

export const CartItem: FC<ICartItemProps> = ({ item }) => {
    const { navigate } = useTypedNavigation()

    return (
        <View className='flex-row mt-5'>
            <Pressable
                onPress={() => navigate('Product', { slug: item.product.slug })}
                className='bg-gray-100 rounded-xl overflow-hidden py-3 px-3 items-center w-28'>
                <Image
                    source={getMediaSource(item.product.image)}
                    width={80}
                    height={80} />
            </Pressable>
            <View className='ml-5 mt-2 flex-1'>
                <Text className='font-semibold text-xl'>
                    {item.product.name}
                </Text>
                <Text className='mt-1'>
                    {ConvertPrice(item.price)}
                </Text>
                <CartActions item={item} />
            </View>
        </View>
    );
};

