import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { Loader } from '@/components';
import { Catalog } from '@/components/shared/catalog/catalog';
import { useProducts } from '../use-products';


export const Products: FC = ({ }) => {
    const { isLoading, products } = useProducts()

    return isLoading ? <Loader /> : (
        <Catalog title='Продукты' products={products} />
    );
};

