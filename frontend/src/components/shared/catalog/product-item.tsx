import { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import cn from 'clsx';
import { IProduct } from '@/types/product.interface';
import { useTypedNavigation } from '@/hooks';
import { getMediaSource } from '@/utils/get-media-source';
import { ProductInfo } from './product-info';

interface Props {
    product: IProduct
}

export const ProductItem: FC<Props> = ({ product }) => {
    const { navigate } = useTypedNavigation()
    return (
        <View className={'rounded-lg flex-col mb-3.5'}>
            <Pressable
                onPress={() => navigate('Product', { slug: product.slug })}
                className='bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center'>
                <Image
                    source={getMediaSource(product.image)}
                    width={180}
                    height={180} />
            </Pressable>
            <ProductInfo product={product}/>
        </View>
    );
};

