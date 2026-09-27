import { FC } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export const Loader: FC = () => {
    return (
        <ActivityIndicator size={'large'} color={'#008B8B'} />
    )
}