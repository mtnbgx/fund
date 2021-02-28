import {Cell} from '@/components/cell';
import {Controller} from 'react-hook-form';
import {Input} from '@tarojs/components';
import React from 'react';

interface HInputProps {
    name: string
    title: string
    errors?: any
    control?: any
    placeholder?: string
    password?: boolean
}

export function HInput({name, title, errors, control, ...rest}: HInputProps) {
    return <Cell title={title} error={errors[name]?.message}>
        <Controller
            name={name}
            control={control}
            defaultValue=''
            render={({onChange, value}) => <Input
                onInput={({detail}) => onChange(detail.value)}
                value={value}
                {...rest}
            />}
        />
    </Cell>
}
