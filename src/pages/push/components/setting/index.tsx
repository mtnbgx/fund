import React, {useEffect} from 'react';
import {Input, View} from '@tarojs/components';
import Taro from '@tarojs/taro'
import {MemberApi} from '@/api/member.api';
import {Cell} from '@/components/cell';
import CSwitch from '@/components/switch/cSwitch';
import {CButton} from '@/components/cButton';
import {UseForm} from '@/components/useform/userForm';
import {TinySelect} from '@/components/CSelect/tinySelect';
import {tinyHelp} from '@/utils/tinyHelp';
import './index.less'

const schema = {
    push: {
        type: 'boolean',
        required: true,
    },
    time: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
}


export function Setting() {

    const updateSetting = async (values) => {
        console.log(values)
        try {
            await MemberApi.setting({
                push: values.push,
                time: values.time,
                email: values.email
            })
            await Taro.showToast({title: '修改成功'})
        } catch (e) {
            console.log(e)
        }
    }


    let {formData, injectInput, injectChange, handleSubmit, errors, setValue} = UseForm({
        email: '',
        time: '',
        push: false
    },schema)


    useEffect(() => {
        const getSetting = async () => {
            let res = await MemberApi.getSetting()
            if (res.success) {
                console.log(res.data)
                setValue('email', res.data.email)
                setValue('push', res.data.push)
                setValue('time', res.data.time)
            }
        }
        getSetting()
    }, [])

    let options = [
        {label: '14:10', value: '14:10:00'},
        {label: '14:30', value: '14:30:00'},
    ]

    return (
        <View className='setting-com' style={tinyHelp.fullPageHeight()}>
            <View className='title'>推送设置</View>
            <View className='body'>
                <Cell title='邮箱' error={errors.email}>
                    <Input value={formData.email} onInput={injectInput('email')} />
                </Cell>
                {formData.email && <Cell title='推送' error={errors.push}>
                    <CSwitch value={formData.push} onChange={injectChange('push')} />
                </Cell>}
                <Cell title='推送时间' error={errors.time}>
                    <TinySelect options={options} value={formData.time} onChange={injectChange('time')} />
                </Cell>
            </View>
            <View className='action'>
                <CButton onClick={handleSubmit(updateSetting)}>保存</CButton>
            </View>
        </View>
    )
}
