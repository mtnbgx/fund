import React, {useEffect} from 'react';
import {Input, Picker, View} from '@tarojs/components';
import CSwitch from '@/components/switch/cSwitch';
import {Cell} from '@/components/cell';
import Taro from '@tarojs/taro'
import {MemberApi} from '@/api/member.api';
import {UseForm} from '@/components/useform/userForm';
import './index.less'

interface IForm {
    push: boolean,
    pickerIndex: number,
    email: string
}

export function Setting() {

    const updateSetting = async (values: IForm, setValue) => {
        try {
            await MemberApi.setting({
                push: values.email.length > 0 ? values.push : false,
                time: pickerData[values.pickerIndex],
                email: values.email
            })
            if (values.email.length === 0) {
                setValue('push', false)
            }
            await Taro.showToast({title: '修改成功'})
        } catch (e) {
            console.log(e)
        }
    }

    let {values, onChange, setValues} = UseForm({
        push: false,
        pickerIndex: 0,
        email: ''
    }, undefined, updateSetting)
    const pickerData = ['14:10', '14:30']

    const getSetting = async () => {
        let res = await MemberApi.getSetting()
        let pickerIndex = 0
        if (res.data.time.indexOf('14:30') !== -1) {
            pickerIndex = 1
        }
        setValues({
            email: res.data.email,
            push: res.data.push,
            pickerIndex
        })
    }

    useEffect(() => {
        getSetting()
    }, [])

    return (
        <View className='setting-com'>
            <View className='title'>推送设置</View>
            <View className='body'>
                <Cell title='开启推送'>
                    <CSwitch value={values.push} onChange={(value) => {
                        if (values.email && values.email.length > 0) {
                            onChange({name: 'push', value: value})
                        } else {
                            Taro.showToast({title: '请先设置邮箱', icon: 'none'})
                        }
                    }}
                    />
                </Cell>
                <Cell title='邮箱'>
                    <Input placeholder='请输入邮箱' value={values.email} onBlur={({detail}) => {
                        onChange({name: 'email', value: detail.value})
                    }}
                    />
                </Cell>
                <Cell title='推送时间'>
                    <Picker mode='selector' range={pickerData} onChange={({detail}) => {
                        onChange({name: 'pickerIndex', value: detail.value})
                    }}
                    >
                        <View className='picker'>
                            {pickerData[values.pickerIndex]}
                        </View>
                    </Picker>
                </Cell>
            </View>
        </View>
    )
}
