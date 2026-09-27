import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { TypeFeatherIconNames } from '@/types/icon.interface';
import { TypeRootStackParamList } from '@/navigation/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { menuItems } from './menu.data';
import { MenuItem } from './menu-item';

export interface IMenuItem {
    className?: string
    icon: TypeFeatherIconNames
    path: keyof TypeRootStackParamList
}
export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void

interface IBottomMenu {
    nav: TypeNavigate
    currentRoute?: string
}

export const BottomMenu: FC<IBottomMenu> = (props) => {
    const { bottom } = useSafeAreaInsets()

    return (
        <View
            className='pt-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-gray-300 bg-white '
            style={{
                paddingBottom: bottom + 20
            }}>
            {
                menuItems.map(item => (
                    <MenuItem key={item.path} item={item} {...props} />
                ))
            }
        </View>
    );
};

