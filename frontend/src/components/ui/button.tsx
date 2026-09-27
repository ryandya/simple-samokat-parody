import { FC, PropsWithChildren } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import cn from 'clsx'

interface Props extends PressableProps {
    className?: string
}

export const Button: FC<PropsWithChildren<Props>> = ({ children, className, ...rest }) => {
    return (
        <Pressable
            className={cn('self-center mt-3.5 bg-[#20B2AA] w-full py-3 font-light rounded-lg', className)}
            {...rest}>
            <Text className='text-white text-center font-medium text-lg'> {children}</Text>
        </Pressable>
    )
}