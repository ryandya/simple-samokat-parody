import { FC } from 'react';
import { Text, View } from 'react-native';
import { IProductComponent } from '../product-screen';
import { ConvertPrice } from '@/utils/convert-price';

export const ProductInfo: FC<IProductComponent> = ({ product }) => {
    return (
        <View className='mt-8'>
            <Text className='font-bold text-2xl'>{product.name}</Text>
            <Text className='mt-2 text-base opacity-70'>{product.description}</Text>
            <Text className='mt-6 text-3xl font-semibold'>{ConvertPrice(product.price)}</Text>
        </View>
    );
};

