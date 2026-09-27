import { useProfile } from '@/hooks';
import { UserService } from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { ProductButton } from './product-button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IFavouriteButton {
    productId: string
}

export const FavouriteButton: FC<IFavouriteButton> = ({ productId }) => {
    const { profile } = useProfile()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: ['toggle favourite'],
        mutationFn: () => UserService.toggleFavourite(productId),

        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['get profile'] })
        }
    })

    if (!profile) return null

    const isExists = profile.favourites.some(favourite => favourite.id === productId)

    return (
        <ProductButton onPress={() => mutate()}>
            {isExists ? (
                <MaterialCommunityIcons
                    name='star'
                    size={22}
                    color={'#10b39d'} />
            ) : (
                <MaterialCommunityIcons
                    name='star-outline'
                    size={22}
                    color={'#555'} />
            )}
        </ProductButton>
    );
};

