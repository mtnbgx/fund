import React from 'react';
import { View} from '@tarojs/components';
import {CButton} from '@/components/cButton';
import * as yup from "yup";
import Taro from '@tarojs/taro';
import {AppStore} from '@/store/app.store';
import { HForm } from '@/components/hForm';
import { HInput } from '@/components/hForm/HInput';
import styles from './signup.module.less'


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
    const onSubmit = data => {
        props.appStore.signup(data)
    }
    return <View className={styles.signup}>
        <View className={styles.title}>注册</View>
        <HForm<FormData> onSubmit={onSubmit} schema={schema}>
            <HInput name='username' title='账号' placeholder='请输入账号' />
            <HInput name='password' title='密码' placeholder='请输入密码' password />
            <HInput name='passwordConfirmation' title='确认密码' placeholder='请输入密码' password />
            <CButton formType='submit' className={styles.btn}>提交</CButton>
        </HForm>
        <View className='row'>
            <View className={styles.login} onClick={() => Taro.navigateTo({url: '/pages/login/index'})}>登录</View>
        </View>
    </View>
}
