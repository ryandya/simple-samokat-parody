import { FC, JSX } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import cn from 'clsx';
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

interface FieldProps<TForm extends FieldValues> extends Omit<TextInputProps, 'onChange' | 'onChangeText' | 'value' | 'onBlur'> {
    className?: string
    control: Control<TForm>
    name: FieldPath<TForm>
    rules?: Omit<RegisterOptions<TForm, FieldPath<TForm>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export const Field = <TForm extends FieldValues>({
    className,
    control,
    name,
    rules,
    ...rest }: FieldProps<TForm>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (<>
                <View className={cn(
                    'bg-white w-full rounded-lg border pb-1 pt-2.5 px-4 my-1.5',
                    error ? 'border-red-500' : 'border-gray-400',
                    className)}>
                    <TextInput
                        secureTextEntry={false}
                        autoCapitalize='none'
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={(value || '').toString()}
                        className='text-black text-base'
                        placeholderTextColor='#6A6A6A'
                        {...rest}
                    />
                </View>
                {error && (
                    <Text className='text-red-500'>
                        {error.message}
                    </Text>
                )}
            </>)}
        />
    );
};

