import React from "react";
import {Input, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {Dialog} from "@/components/dialog";
import {CButton} from "@/components/cButton";
import {Fund} from "@/api/fund.api";
import {MonitorApi} from '@/api/monitor.api';
import {UseForm} from '@/components/useform/userForm';
import {Cell} from '@/components/cell';
import './index.less'


interface Props {
    visible: boolean,
    hide: () => void,
    fund?: Fund
}

export function AddFund(props: Props) {

    let {formData, injectInput, handleSubmit, errors} = UseForm({
        up: '1',
        down: '1'
    })

    const submit = async (vs) => {
        try {
            await MonitorApi.addMonitor({...vs, fundId: props.fund?.id})
            await Taro.showToast({title: '添加成功'})
            Taro.reLaunch({url: '/pages/home/index'})
        } catch {
            await Taro.showToast({title: '添加失败', icon: 'none'})
        }
    }
    return <Dialog visible={props.visible} hide={props.hide} title='添加提醒'>
        <View className='add-fund-com'>
            <View className='name'>{props.fund?.name}</View>
            <View className='code'>{props.fund?.code}</View>
            <Cell title='估算收益升至' error={errors.up}>
                <Input value={formData.up} onInput={injectInput('up')} placeholder='请输入数字' />
            </Cell>
            <Cell title='估算收益降至' error={errors.down}>
                <Input value={formData.down} onInput={injectInput('down')} placeholder='请输入数字' />
            </Cell>
            <CButton size='mini' onClick={handleSubmit(submit)} className='sub'>提交</CButton>
        </View>
    </Dialog>
}
