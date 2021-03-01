import React from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {Dialog} from "@/components/dialog";
import {CButton} from "@/components/cButton";
import {Fund} from "@/api/fund.api";
import {MonitorApi} from '@/api/monitor.api';
import * as yup from 'yup';
import {HInput} from '@/components/hForm/HInput';
import {HForm} from '@/components/hForm';
import './index.less'


const schema = yup.object().shape({
    up: yup.number().typeError('不能为空').min(0, '必须大于0'),
    down: yup.number().typeError('不能为空').min(0, '必须大于0')
});

interface Props {
    visible: boolean,
    hide: () => void,
    fund?: Fund
}

export function AddFund(props: Props) {
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
            <HForm onSubmit={submit} schema={schema} defaultValues={{up: 1, down: 1}}>
                <HInput name='up' title='估算收益升至' placeholder='请输入数字' />
                <HInput name='down' title='估算收益降至' placeholder='请输入数字' />
                <CButton size='mini' formType='submit' className='sub'>提交</CButton>
            </HForm>
        </View>
    </Dialog>
}
