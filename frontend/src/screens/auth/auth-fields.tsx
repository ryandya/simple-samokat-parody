import { Field } from '@/components/ui';
import { IAuthFormData } from '@/types/auth.interface';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { validEmail } from './email.regex';

interface IAuthFields {
    control: Control<IAuthFormData>
}

export const AuthFields: FC<IAuthFields> = ({ control }) => {
    return (
        <>
            <Field<IAuthFormData>
                placeholder='Введите почту'
                control={control}
                name='email'
                rules={{
                    required: 'Поле обязательно',
                    pattern: {
                        value: validEmail,
                        message: 'Введите корректную почту'
                    }
                }}
                keyboardType='email-address'
            />
            <Field<IAuthFormData>
                placeholder='Введите пароль'
                control={control}
                name='password'
                rules={{
                    required: 'Поле обязательно',
                    minLength: {
                        value: 6,
                        message: 'Пароль < 6 символов'
                    }
                }}
                secureTextEntry={true}
            />
        </>
    );
};

