import React from 'react';
import {Input, View} from '@tarojs/components';
import {CButton} from '@/components/cButton';
import Taro from '@tarojs/taro';
import {AppStore} from '@/store/app.store';
import {UseForm} from '@/components/useform/userForm';
import {Cell} from '@/components/cell';
import './login.less'

interface Props {
    appStore: AppStore
}

const schema = {
    username: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true
    }
}

export function Login(props: Props) {

    let {formData, injectInput, handleSubmit, errors} = UseForm({
        username: '',
        password: ''
    }, schema)

    const onSubmit = (data) => {
        props.appStore.login(data)
    }

    return <View className='login-page'>
        <View className='header'>
            <View className='title'>登录/注册 更精彩</View>
        </View>
        <View className='form'>
            <Cell title='账号' error={errors.username}>
                <Input value={formData.username} onInput={injectInput('username')} />
            </Cell>
            <Cell title='密码' error={errors.password}>
                <Input value={formData.password} password onInput={injectInput('password')} />
            </Cell>
            <CButton onClick={handleSubmit(onSubmit)} className='sub'>提交</CButton>
            <View className='row'>
                <View className='reg' onClick={() => Taro.navigateTo({url: '/pages/login/signup'})}>注册账号</View>
            </View>
        </View>
    </View>
}
