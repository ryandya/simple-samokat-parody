import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import cn from 'clsx';
import { useAuth, useProfile } from '@/hooks';
import { Button, Header, Layout } from '@/components';
import { AuthService } from '@/services/auth/auth.service';

interface Props {
    className?: string;
}

export const Profile: FC<Props> = ({ className }) => {

    const { setUser } = useAuth()
    const { profile } = useProfile()

    return (
        <Layout className={cn(className)}>
            <Header isCenter>Профиль</Header>
            <View className='my-6 items-center justify-center'>
                <Image
                    source={{ uri: profile?.avatarPath }}
                    className='w-40 h-40 rounded-full' />
            </View>
            <Button onPress={() =>
                AuthService.logout().then(() => setUser(null))}
                className='mt-5'>Выйти из аккаунта</Button>
        </Layout>
    );
};

