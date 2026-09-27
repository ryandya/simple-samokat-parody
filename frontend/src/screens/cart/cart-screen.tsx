import { Button, Header, Layout } from '@/components';
import { useCart } from '@/hooks/use-cart';
import { ConvertPrice } from '@/utils/convert-price';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { CartItem } from './components/cart-item';

export const Cart: FC = ({ }) => {
    const { items, totalPrice } = useCart()

    return (
        <>
            <Layout>
                <Header>Корзина</Header>
                {items.length ? (
                    items.map(item => <CartItem key={item.id} item={item} />)
                ) : (<Text className='mt-2'>Продукт не найден</Text>)}
            </Layout>

            {items.length ? (
                <View className='bottom-8 absolute w-[90%] mx-5'>
                    <Text className='font-bold text-xl'>
                        Общая стоимость: {ConvertPrice(totalPrice)}
                    </Text>
                    <Button onPress={() => { }}>
                        Оформить заказ
                    </Button>
                </View>
            ) : null}
        </>
    );
};

