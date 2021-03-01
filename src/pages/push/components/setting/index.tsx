import React, {useEffect} from 'react';
import {Input, View} from '@tarojs/components';
import Taro from '@tarojs/taro'
import {MemberApi} from '@/api/member.api';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {Cell} from '@/components/cell';
import CSwitch from '@/components/switch/cSwitch';
import {CSelect} from '@/components/hForm/HSelect';
import {CButton} from '@/components/cButton';
import {yupResolver} from '@hookform/resolvers/yup';
import './index.less'


const schema = yup.object().shape({
    push: yup.boolean(),
    email: yup.string().email(),
    time: yup.string().min(5)
});

export function Setting() {

    const updateSetting = async (values) => {
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


    const {watch, errors, control, handleSubmit, setValue} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            time: '',
            push: false
        }
    });


    useEffect(() => {
        const getSetting = async () => {
            let res = await MemberApi.getSetting()
            if (res.success) {
                setValue('email', res.data.email)
                setValue('time', res.data.time)
                setValue('push', res.data.push)
            }
        }
        getSetting()
    }, [setValue])

    let options = [
        {label: '14:10', value: '14:10:00'},
        {label: '14:30', value: '14:30:00'},
    ]

    const watchEmail = watch('email')
    return (
        <View className='setting-com'>
            <View className='title'>推送设置</View>
            <View className='body'>
                <Controller name='email' control={control}
                            render={({value, onChange}) => {
                                return <Cell title='邮箱' error={errors.email?.message}>
                                    <Input value={value} onBlur={(e) => onChange(e.detail.value)} />
                                </Cell>
                            }}
                />
                {
                    watchEmail && <Controller name='push' control={control}
                                              render={({value, onChange}) => {
                                                  return <Cell title='开启推送' error={errors.push?.message}>
                                                      <CSwitch value={value} onChange={(v) => onChange(v)} />
                                                  </Cell>
                                              }
                                              }
                    />
                }
                <Controller name='time' control={control} render={({value, onChange}) => {
                    return <Cell title='推送时间' error={errors.time?.message}>
                        <CSelect options={options} value={value} onChange={(v) => onChange(v)} />
                    </Cell>
                }}
                />
            </View>
            <View className='action'>
                <CButton onClick={() => handleSubmit(updateSetting)()}>保存</CButton>
            </View>
        </View>
    )
}
