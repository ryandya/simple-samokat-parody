import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { useProfile } from '@/hooks';
import { Catalog, Layout } from '@/components';


export const Favourites: FC = ({ }) => {
    const { profile } = useProfile()
    return (
        <Layout>
            <Catalog title='Favourites' products={profile?.favourites || []} />
        </Layout>
    );
};

