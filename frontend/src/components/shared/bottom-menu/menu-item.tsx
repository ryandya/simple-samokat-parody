import { Feather } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable } from 'react-native';
import { IMenuItem, TypeNavigate } from './bottom-menu';

interface IMenuItemProps {
    className?: string
    item: IMenuItem
    nav: TypeNavigate
    currentRoute?: string
}

export const MenuItem: FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
    const isActive = currentRoute === item.path

    return (
        <Pressable onPress={() => nav(item.path)} className='items-center w-[20%]' >
            <Feather
                name={item.icon}
                size={26}
                color={isActive ? '#008f81' : '#374151'}
            />
        </Pressable>
    );
};

