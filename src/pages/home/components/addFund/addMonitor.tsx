import React from "react";
import {Input, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {Rules} from 'async-validator';
import {Dialog} from "@/components/dialog";
import {CButton} from "@/components/cButton";
import {Fund} from "@/api/fund.api";
import {Cell} from '@/components/cell';
import {UseForm} from '@/components/useform/userForm';
import {MonitorApi} from '@/api/monitor.api';
import './index.less'


interface Props {
    visible: boolean,
    hide: () => void,
    fund?: Fund
}

export function AddFund(props: Props) {

    const descriptor: Rules = {
        up: {
            type: 'string',
            required: true,
            validator: (_, value) => value > 0,
            message: 'up必须大于0',
        },
        down: {
            type: 'string',
            required: true,
            validator: (_, value) => value > 0,
            message: 'down必须大于0',
        }
    }
    const {values, onInput, handleSubmit} = UseForm({up: '', down: ''}, descriptor)

    const submit = async (vs) => {
        try {
            await MonitorApi.addMonitor({...vs, fundId: props.fund?.id})
            await Taro.showToast({title: '添加成功'})
        } catch {
            await Taro.showToast({title: '添加失败', icon: 'none'})
        }
    }
    return <Dialog visible={props.visible} hide={props.hide} title='添加提醒'>
        <View className='add-fund-com'>
            <View className='name'>{props.fund?.name}</View>
            <View className='code'>{props.fund?.code}</View>
            <Cell title='估算收益升至'>
                <Input name='up' type='number' placeholder='请输入数字' value={values.up}
                       onInput={onInput}
                />
            </Cell>
            <Cell title='估算收益降至'>
                <Input name='down' type='number' placeholder='请输入数字' value={values.down}
                       onInput={onInput}
                />
            </Cell>
            <CButton size='mini' className='submit' onClick={handleSubmit(submit)}>添加</CButton>
        </View>
    </Dialog>
}
