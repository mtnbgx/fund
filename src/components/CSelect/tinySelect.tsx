import React from 'react';
import {View} from '@tarojs/components';
import {tinyHelp} from '@/utils/tinyHelp';

interface Props {
    options: { label: string, value: any }[],
    value?: any,
    onChange?: (value: any) => void
}

export function TinySelect(props: Props) {
    const labels = props.options.map(o => o.label)
    let label = '请选择'
    props.options.map(o => {
        if (o.value === props.value) {
            label = o.label
        }
    })
    const onClick = async () => {
        try {
            const index = await tinyHelp.showActionSheet(labels)
            console.log('TinySelect',index)
            if (index >= 0) {
                props.onChange && props.onChange(props.options[index].value)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return <View onClick={onClick}>{label}</View>
}
