import React from 'react';
import {Input, View} from '@tarojs/components';
import {Cell} from '@/components/cell';
import {CButton} from '@/components/cButton';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Taro from '@tarojs/taro';
import styles from './signup.module.less'
import {AppStore} from '@/store/app.store';


const schema = yup.object().shape({
    username: yup.string().min(5).required(),
    password: yup.string().min(5).required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type FormData = {
    username: string;
    password: string;
    passwordConfirmation: string;
};

interface Props {
    appStore: AppStore
}

export function Signup(props: Props) {
    const {handleSubmit, control, errors} = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        props.appStore.signup(data)
    }
    return <View className={styles.signup}>
        <View className={styles.title}>注册</View>
        <Cell title='账号' error={errors.username?.message}>
            <Controller
                name='username'
                control={control}
                defaultValue=''
                render={({onChange, value}) => <Input placeholder='请输入账号'  onInput={({detail}) => onChange(detail.value)} value={value} />}
            />
        </Cell>
        <Cell title='密码' error={errors.password?.message}>
            <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({onChange, value}) => <Input placeholder='请输入密码'  password onInput={({detail}) => onChange(detail.value)}
                                                      value={value}
                />}
            />
        </Cell>
        <Cell title='确认密码' error={errors.passwordConfirmation?.message}>
            <Controller
                name='passwordConfirmation'
                control={control}
                defaultValue=''
                render={({onChange, value}) => <Input placeholder='请输入密码'  password onInput={({detail}) => onChange(detail.value)}
                                                      value={value}
                />}
            />
        </Cell>
        <CButton className={styles.btn} onClick={() => handleSubmit(onSubmit)()}>注册</CButton>
        <View className='row'>
            <View className={styles.login} onClick={() => Taro.navigateTo({url: '/pages/login/index'})}>登录</View>
        </View>
    </View>
}