import {Cell} from '@/components/cell';
import {Controller} from 'react-hook-form';
import React from 'react';
import CSwitch from '@/components/switch/cSwitch';

interface HInputProps {
    name: string
    title: string
    errors?: any
    control?: any
}

export function HSwitch({name, title, errors, control, ...rest}: HInputProps) {
    return <Cell title={title} error={errors[name]?.message}>
        <Controller
            name={name}
            control={control}
            defaultValue=''
            render={({onChange, value}) => <CSwitch
                onChange={(v) => onChange(v)}
                value={value}
                {...rest}
            />}
        />
    </Cell>
}
