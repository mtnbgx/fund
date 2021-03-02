import React from "react";
import {Input, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {CButton} from "@/components/cButton";
import {Dialog} from "@/components/dialog";
import {Monitor, MonitorApi} from '@/api/monitor.api';
import {UseForm} from '@/components/useform/userForm';
import {Cell} from '@/components/cell';
import './index.less'

interface Props {
    visible: boolean,
    hide: () => void,
    monitor: Monitor,
    refresh?: () => void
}


export function UpdateMonitor(props: Props) {
    if (!props.monitor) {
        return <View />
    }

    let {formData, injectInput, handleSubmit, errors} = UseForm({
        up: props.monitor.up,
        down: props.monitor.down
    })

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
            <Cell title='估算收益升至' error={errors.up}>
                <Input value={formData.up} onInput={injectInput('up')} placeholder='请输入数字' />
            </Cell>
            <Cell title='估算收益降至' error={errors.up}>
                <Input value={formData.down} onInput={injectInput('down')} placeholder='请输入数字' />
            </Cell>
            <CButton size='mini' onClick={handleSubmit(submit)} className='sub'>提交</CButton>
        </View>
    </Dialog>
}
