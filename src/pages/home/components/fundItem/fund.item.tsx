import React, {ReactNode} from "react";
import {View} from "@tarojs/components";
import {Fund} from "../../../../api/fund.api";
import './fund.item.less'

interface Props {
    fund: Fund,
    action?: (fund: Fund) => ReactNode
    onLongPress?: (fund: Fund) => void
    onClick?: (fund: Fund) => void
}

export function FundItem(props: Props) {
    const zfColor = (zf: string) => {
        if (parseInt(zf) > 0) {
            return '#d81e06'
        } else {
            return 'green'
        }
    }
    return <View className='fund-item-com'
      onLongPress={() => props.onLongPress && props.onLongPress(props.fund)}
      onClick={() => props.onClick && props.onClick(props.fund)}
    >
        <View className='col'>
            <View className='name'>
                {props.fund.name}
            </View>
            <View className='code'>{props.fund.code}</View>
        </View>
        <View className='col right'>
            <View className='jz show-col'>
                <View className='price'>2.2214</View>
                <View className='zf' style={{'color': zfColor('4.44')}}>4.44%</View>
                <View className='date'>02-22</View>
            </View>
            {
                props.action ? props.action(props.fund) : <View className='gz show-col'>
                    <View className='price'>2.2214</View>
                    <View className='zf' style={{'color': zfColor('-4.44')}}>-4.44%</View>
                </View>
            }
        </View>
    </View>
}
