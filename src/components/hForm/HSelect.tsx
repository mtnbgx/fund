import {Cell} from '@/components/cell';
import {Controller} from 'react-hook-form';
import React from 'react';
import {Picker, View} from '@tarojs/components';

interface Props {
    options: { label: string, value: any }[],
    value?: any,
    onChange?: (value: any) => void
}

export function CSelect({options, value, onChange}: Props) {
    const labels = options.map(o => o.label)
    let label = '请选择'
    options.map(o => {
        if (o.value === value) {
            label = o.label
        }
    })
    return <Picker mode='selector' range={labels}
                   onChange={({detail}) => {
                       if (onChange) {
                           onChange(options[detail.value].value)
                       }
                   }}
    >
        <View className='picker'>
            {label}
        </View>
    </Picker>
}

interface HInputProps {
    name: string
    title: string
    errors?: any
    control?: any
    options: { label: string, value: any }[]
}

export function HSelect({name, title, errors, control, options}: HInputProps) {
    return <Cell title={title} error={errors[name]?.message}>
        <Controller
            name={name}
            control={control}
            defaultValue=''
            render={({onChange, value}) => <CSelect value={value} onChange={(v) => onChange(v)} options={options} />
            }
        />
    </Cell>
}

