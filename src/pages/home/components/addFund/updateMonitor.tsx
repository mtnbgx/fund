import React from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {Dialog} from "@/components/dialog";
import {CButton} from "@/components/cButton";
import {Monitor, MonitorApi} from '@/api/monitor.api';
import {HInput} from '@/components/hForm/HInput';
import {HForm} from '@/components/hForm';
import * as yup from 'yup';
import './index.less'

interface Props {
    visible: boolean,
    hide: () => void,
    monitor: Monitor,
    refresh?: () => void
}

const schema = yup.object().shape({
    up: yup.number().typeError('不能为空').min(0, '必须大于0'),
    down: yup.number().typeError('不能为空').min(0, '必须大于0')
});


export function UpdateMonitor(props: Props) {
    if (!props.monitor) {
        return <View></View>
    }
    const submit = async (vs) => {
        try {
            await MonitorApi.updateMonitor(props.monitor.id, vs)
            await Taro.showToast({title: '修改成功'})
            props.refresh && props.refresh()
        } catch {
            await Taro.showToast({title: '修改失败', icon: 'none'})
        }
    }
    const {monitor} = props
    return <Dialog visible={props.visible} hide={props.hide} title='修改提醒'>
        <View className='add-fund-com'>
            <View className='name'>{monitor.fund.name}</View>
            <View className='code'>{monitor.fund.code}</View>
            <HForm onSubmit={submit} schema={schema} defaultValues={{up: monitor.up, down: monitor.down}}>
                <HInput name='up' title='估算收益升至' placeholder='请输入数字' />
                <HInput name='down' title='估算收益降至' placeholder='请输入数字' />
                <CButton size='mini' formType='submit' className='sub'>提交</CButton>
            </HForm>
        </View>
    </Dialog>
}
