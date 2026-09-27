import { Header, Loader } from '@/components';
import { useTypedNavigation } from '@/hooks';
import { getMediaSource } from '@/utils/get-media-source';
import { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useGetCategories } from '../use-get-categories';

interface Props {
    className?: string;
}

export const Categories: FC<Props> = ({ className }) => {
    const { categories, isLoading } = useGetCategories()
    const { navigate } = useTypedNavigation()

    return isLoading ? (<Loader />)
        : (
            <View className={'flex flex-col mt-5 mb-4'}>
                <Header>Категории</Header>
                <View className='flex-row justify-center mt-5'>
                    {
                        categories?.map(category => (
                            <Pressable
                                key={category.id}
                                onPress={() => navigate('Category', { slug: category.slug })}
                                className='items-center rounded-xl bg-gray-100 p-5 mx-2'>
                                <Image
                                    className='w-10 h-10 mb-2 p-4'
                                    style={{ resizeMode: 'cover' }}
                                    source={getMediaSource(category.image)} />
                                <Text className='font-normal text-xs text-center'>
                                    {category.name}
                                </Text>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
        )
}

