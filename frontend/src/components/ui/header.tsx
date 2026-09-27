import cn from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { Text } from 'react-native';

interface IHeader {
    className?: string
    isCenter?: boolean
}

export const Header: FC<PropsWithChildren<IHeader>> = ({ children, className, isCenter = false }) => {
    return (
        <Text className={cn(
            className,
            'text-black font-medium text-xl',
            isCenter && 'text-center')}>
            {children}
        </Text>
    );
};

