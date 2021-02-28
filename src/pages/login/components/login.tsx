import React from 'react';
import {Input, View} from '@tarojs/components';
import {CButton} from '@/components/cButton';
import Taro from '@tarojs/taro';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Cell} from '@/components/cell';
import {AppStore} from '@/store/app.store';
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

    const {handleSubmit, control, errors} = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        props.appStore.login(data)
    }

    return <View className='login-page'>
        <View className='header'>
            <View className='title'>登录/注册 更精彩</View>
        </View>
        <View className='form'>
            <View className='error'>{errors.username?.message}</View>
            <Cell title='账号'>
                <Controller
                    name='username'
                    control={control}
                    defaultValue=''
                    render={({onChange, value}) => <Input onInput={({detail}) => onChange(detail.value)}
                                                          value={value}
                    />}
                />
            </Cell>
            <View className='error'>{errors.password?.message}</View>
            <Cell title='密码'>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({onChange, value}) => <Input password onInput={({detail}) => onChange(detail.value)}
                                                          value={value}
                    />}
                />
            </Cell>
            <CButton className='sub' onClick={() => handleSubmit(onSubmit)()}>登录</CButton>
            <View className='row'>
                <View className='reg' onClick={() => Taro.navigateTo({url: '/pages/login/signup'})}>注册账号</View>
            </View>
        </View>
    </View>
}
