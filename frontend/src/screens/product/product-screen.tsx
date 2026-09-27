import { Layout, Loader } from '@/components';
import { getMediaSource } from '@/utils/get-media-source';
import { FC } from 'react';
import { Image, View } from 'react-native';
import { useProduct } from './use-product';
import { IProduct } from '@/types/product.interface';
import { ProductHeader } from './components/product-header';
import { ProductInfo } from './components/product-info';
import { CartAddButton } from './components/cart-add-button';

export interface IProductComponent {
    product: IProduct
}

export const Product: FC = () => {
    const { isLoading, product } = useProduct()

    if (isLoading) return <Loader />
    if (!product) return null

    return (
        <Layout>
            <ProductHeader product={product} />
            <View className='items-center justify-center mt-4'>
                <Image
                    width={260}
                    height={260}
                    source={getMediaSource(product.image)} />

            </View>
            <ProductInfo product={product} />
            <CartAddButton product={product} />
        </Layout>
    );
};

