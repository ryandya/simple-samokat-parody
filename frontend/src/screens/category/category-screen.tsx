import { Catalog, Layout, Loader } from '@/components';
import { FC } from 'react';
import { Text } from 'react-native';
import { useCategory } from './use-category';

export const Category: FC = ({ }) => {
    const { category, isLoading, products } = useCategory()

    if (isLoading) return <Loader />

    return (
        <Layout>
            {category ? (
                <Catalog
                    title={category.name}
                    products={products || []} />
            ) : (
                <Text>
                    Категория не найдена
                </Text>
            )}
        </Layout>
    );
};

