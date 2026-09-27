import { Button } from '@/components';
import { useActions } from '@/hooks';
import { useCart } from '@/hooks/use-cart';
import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import { Text, View } from 'react-native';

interface IAddToCartButton {
    product: IProduct
}

export const CartAddButton: FC<IAddToCartButton> = ({ product }) => {
    const { addToCart, removeFromCart } = useActions()
    const { items } = useCart()
    const currentElement = items.find(cartItem => cartItem.product.id === product.id)

    return (
        <Button onPress={() => currentElement
            ? removeFromCart({ id: currentElement.id })
            : addToCart({ product, quantity: 1, price: product.price })}
            className='mt-6'>
            {currentElement ? 'Убрать из корзины' : 'Добавить в корзину'}
        </Button>
    );
};

