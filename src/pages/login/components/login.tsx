import React from 'react';
import {View} from '@tarojs/components';
import {CButton} from '@/components/cButton';
import Taro from '@tarojs/taro';
import * as yup from 'yup';
import {AppStore} from '@/store/app.store';
import { HForm } from '@/components/hForm';
import {HInput} from '@/components/hForm/HInput';
import './login.less'

type FormData = {
    username: string;
    password: string;
};

const schema = yup.object().shape({
    username: yup.string().min(4).required(),
    password: yup.string().min(4).required(),
});

interface Props {
    appStore: AppStore
}

export function Login(props: Props) {

    const onSubmit = (data: FormData) => {
        props.appStore.login(data)
    }

    return <View className='login-page'>
        <View className='header'>
            <View className='title'>登录/注册 更精彩</View>
        </View>
        <View className='form'>
            <HForm<FormData> onSubmit={onSubmit} schema={schema}>
                <HInput name='username' title='账号' placeholder='请输入账号' />
                <HInput name='password' title='密码' placeholder='请输入密码' password />
                <CButton formType='submit' className='sub'>提交</CButton>
            </HForm>
            <View className='row'>
                <View className='reg' onClick={() => Taro.navigateTo({url: '/pages/login/signup'})}>注册账号</View>
            </View>
        </View>
    </View>
}
