import React, {ReactNode} from "react";
import {View} from "@tarojs/components";
import {Fund} from "@/api/fund.api";
import './fund.item.less'

interface Props {
    fund: Fund,
    maxjzrq?: string
    maxgzrq?: string
    action?: (fund: Fund) => ReactNode
    onLongPress?: (fund: Fund) => void
    onClick?: (fund: Fund) => void
}

export function FundItem(props: Props) {
    const zfColor = (zf: string) => {
        if (parseFloat(zf) > 0) {
            return '#d81e06'
        } else {
            return 'green'
        }
    }
    const {fund} = props
    return <View className='fund-item-com'
                 onLongPress={() => props.onLongPress && props.onLongPress(fund)}
                 onClick={() => props.onClick && props.onClick(fund)}
    >
        <View className='col'>
            <View className='name'>
                {fund.name}
            </View>
            <View className='code'>{fund.code}</View>
        </View>
        <View className='col right'>
            {
                !props.action && <View className='jz show-col'>
                    <View className='price'>{fund.NAV}</View>
                    <View className='zf' style={{'color': zfColor(fund.NAVCHGRT)}}>{fund.NAVCHGRT}%</View>
                    <View className='date'>{
                        fund.PDATE === props.maxjzrq ? '' :
                            fund.PDATE.substring(5, fund.PDATE.length)
                    }</View>
                </View>
            }
            {
                props.action ? props.action(props.fund) : <View className='gz show-col'>
                    <View className='price'>{fund.GSZ}</View>
                    <View className='zf' style={{'color': zfColor(fund.GSZZL)}}>{fund.GSZZL}%</View>
                    <View className='date'>{
                        fund.GZTIME.substring(0, 10) === props.maxgzrq ? '' :
                            fund.GZTIME
                    }</View>
                </View>
            }
        </View>
    </View>
}
