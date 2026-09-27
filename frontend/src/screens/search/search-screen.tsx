import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { Catalog, Field, Header, Layout, Loader } from '@/components';
import { useSearch } from './use-search';
import { ISearchFormData } from './use-search-form';

export const Search: FC = () => {
    const { searchTerm, control, isLoading, products } = useSearch()

    return (
        <Layout >
            <Header>
                Search
            </Header>
            <View className='mt-3'>
                <Field<ISearchFormData>
                    placeholder='Введите название продукта..'
                    control={control}
                    name='searchTerm'
                    inputMode='search'/>
            </View>
            {!!searchTerm ? (
                <View className='mt-2'>
                    {isLoading
                        ? <Loader />
                        : <Catalog products={products || []} />}
                </View>
            ) : null}
        </Layout>
    );
};


