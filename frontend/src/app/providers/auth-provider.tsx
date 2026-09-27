import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper';
import { IUser } from '@/types/user.interface';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';

type TypeUserState = IUser | null

interface IContext {
    className?: string
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)
let ignore = SplashScreen.preventAutoHideAsync()

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [user, setUser] = useState<TypeUserState>({} as IUser)

    useEffect(() => {
        let isMounted = true

        const checkAccessToken = async () => {
            try {
                const accessToken = await getAccessToken()

                if (accessToken) {
                    const user = await getUserFromStorage()
                    if (isMounted) setUser(user)
                }
            } catch (error) {
                console.log(error)
            } finally {
                await SplashScreen.hideAsync()
            }
        }

        let ignore = checkAccessToken()
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

