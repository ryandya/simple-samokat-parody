import { FC } from 'react';
import { Text, View } from 'react-native';
import { IProductComponent } from '../product-screen';
import { useTypedNavigation } from '@/hooks';
import { ProductButton } from './product-button';
import { FavouriteButton } from './favourite-button';

export const ProductHeader: FC<IProductComponent> = ({ product }) => {
    const { goBack } = useTypedNavigation()
    return (
        <View>
            <View className='flex-row justify-between mt-2'>
                <ProductButton
                    onPress={goBack}
                    icon='chevron-left'
                    iconSize={26}
                    color='#555' />
                <FavouriteButton productId={product.id} />
            </View>
        </View>
    );
};

