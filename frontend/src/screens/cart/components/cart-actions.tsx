import { useActions } from '@/hooks';
import { useCart } from '@/hooks/use-cart';
import { ICartItem } from '@/types/cart.interface';
import { AntDesign, Feather } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

interface ICartActionProps {
    item: ICartItem
}

export const CartActions: FC<ICartActionProps> = ({ item }) => {
    const { removeFromCart, changeQuantity } = useActions()
    const { items } = useCart()
    const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity
    return (
        <View className='mt-4 flex-row items-center gap-x-4'>
            <Pressable
                onPress={() => changeQuantity({ id: item.id, type: 'minus' })}
                disabled={quantity === 1}>
                <AntDesign
                    name="minus"
                    size={18}
                    color={quantity === 1 ? 'gray' : 'black'} />
            </Pressable>
            <Text>{quantity}</Text>
            <Pressable
                onPress={() => changeQuantity({ id: item.id, type: 'plus' })}>
                <AntDesign name='plus' size={18} />
            </Pressable>
            <Pressable
                className='ml-auto'
                onPress={() => removeFromCart({ id: item.id })}>
                <Feather name="trash-2" size={18} />
            </Pressable>
        </View>
    );
};

