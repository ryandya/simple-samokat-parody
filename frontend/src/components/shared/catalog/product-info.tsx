import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { IProduct } from '@/types/product.interface';
import { ConvertPrice } from '@/utils/convert-price';

interface Props {
    product: IProduct
}

export const ProductInfo: FC<Props> = ({ product }) => {
    return (
        <View className={'my-3'}>
            <Text className='font-semibold text-base'>{product.name}</Text>
            <Text className='py-1.5'>{product.category.name}</Text>
            <Text className='mt-1 font-semibold text-sm text-center py-1 w-[70px] rounded-full text-white bg-cyan-600'>
                {ConvertPrice(product.price)}
            </Text>
        </View>
    );
};

