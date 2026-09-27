import { Button, Loader } from '@/components/ui'
import { IAuthFormData } from '@/types/auth.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import { AuthFields } from './auth-fields'
import { useAuthMutations } from './use-auth-mutations'

const Auth: FC = () => {

    const [isReg, setIsReg] = useState(false)

    const { handleSubmit, reset, control } = useForm<IAuthFormData>({
        mode: 'onChange'
    })

    const { isLoading, loginSync, registerSync } = useAuthMutations(reset)

    const onSubmit: SubmitHandler<IAuthFormData> = data => {
        if (isReg) registerSync(data)
        else loginSync(data)
    }



    return (
        <View className='mx-2 items-center justify-center h-full'>
            <View className='w-9/12'>
                <Text className='text-center text-black text-3xl font-medium mb-8'>
                    {isReg ? 'Регистрация' : 'Войти в аккаунт'}
                </Text>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <AuthFields control={control} />
                        <Button onPress={handleSubmit(onSubmit)}>
                            {isReg
                                ? ' Регистрация'
                                : ' Войти'
                            }
                        </Button>

                        <Pressable onPress={() => setIsReg(!isReg)}>
                            <Text className='text-black text-center text-base mt-6'>
                                {isReg
                                    ? 'Уже есть аккаунт?'
                                    : 'Нет аккаунта?'
                                }
                                <Text className='text-[#008f81]'>
                                    {isReg
                                        ? ' Войти'
                                        : ' Регистрация'
                                    }
                                </Text>
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View >
    )
}

export default Auth
