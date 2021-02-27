import React, {useState} from 'react';
import {View} from '@tarojs/components';
import CSwitch from '@/components/switch/cSwitch';
import {Cell} from '@/components/cell';
import './index.less'

export function Setting() {

    const [status, setStatus] = useState(false)
    return (
        <View className='setting-com'>
            <View className='title'>推送设置</View>
            <View className='body'>
                <Cell title='开启推送'>
                    <CSwitch value={status} onChange={(b) => setStatus(b)} />
                </Cell>
                <Cell title='推送时间'>
                    11: 00
                </Cell>
            </View>
        </View>
    )
}
