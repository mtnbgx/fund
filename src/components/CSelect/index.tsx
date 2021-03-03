import React from 'react';
import {Picker, View} from '@tarojs/components';

interface Props {
    options: { label: string, value: any }[],
    value?: any,
    onChange?: (value: any) => void
}

function Index({options, value, onChange}: Props) {
    const labels = options.map(o => o.label)
    let label = '请选择'
    options.map(o => {
        if (o.value === value) {
            label = o.label
        }
    })
    console.log(label, labels, options)
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

function areEqual(prevProps, nextProps) {
    return prevProps.value === nextProps.value
}


export const CSelect = React.memo(Index, areEqual)
