import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { PrivateNavigator } from './private-navigator'
import { BottomMenu } from '@/components/shared/bottom-menu/bottom-menu'
import { useAuth } from '@/hooks/use-auth'
import { TypeRootStackParamList } from './navigation.types'
import { useCheckAuth } from '@/hooks/use-check-auth'


const Navigation: FC = () => {

    const { user } = useAuth()
    const [currentRoute, setCurrentRoute] = useState<keyof TypeRootStackParamList>()
    const navRef = useNavigationContainerRef<TypeRootStackParamList>()

    const updateCurrentRoute = () => {
        setCurrentRoute(navRef.getCurrentRoute()?.name)
    }

    useCheckAuth(currentRoute)

    return (
        <>
            <NavigationContainer
                ref={navRef}
                onReady={updateCurrentRoute}
                onStateChange={updateCurrentRoute}
            >
                <PrivateNavigator />
            </NavigationContainer>
            {
                user && currentRoute && (
                    <BottomMenu
                        nav={navRef.navigate}
                        currentRoute={currentRoute} />
                )
            }
        </>

    )
}

export default Navigation
