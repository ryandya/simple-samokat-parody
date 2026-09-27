import { Catalog, Layout, Loader } from '@/components';
import { useGetAllProducts } from './use-get-all-products';
import { FC } from 'react';

export const Explorer: FC = ({ }) => {
    const { isLoading, products } = useGetAllProducts()
    return (
        <Layout>
            {isLoading
                ? (<Loader />)
                : (<Catalog
                    title='Все продукты'
                    products={products || []}/>)}
        </Layout>
    );
};

