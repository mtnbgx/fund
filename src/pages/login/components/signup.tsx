import React from 'react';
import {Input, View} from '@tarojs/components';
import {CButton} from '@/components/cButton';
import Taro from '@tarojs/taro';
import {AppStore} from '@/store/app.store';
import {UseForm} from '@/components/useform/userForm';
import {Cell} from '@/components/cell';
import styles from './signup.module.less'


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
    },
    passwordConfirmation: {
        type: 'string',
        required: true
    },
}

export function Signup(props: Props) {

    let {formData, injectInput, handleSubmit, errors} = UseForm({
        username: '',
        password: '',
        passwordConfirmation: ''
    }, schema)


    const onSubmit = data => {
        props.appStore.signup(data)
    }
    return <View className={styles.signup}>
        <View className={styles.title}>注册</View>
        <Cell title='账号' error={errors.username}>
            <Input value={formData.username} onInput={injectInput('username')} />
        </Cell>
        <Cell title='密码' error={errors.password}>
            <Input value={formData.password} password onInput={injectInput('password')} />
        </Cell>
        <Cell title='确认密码' error={errors.passwordConfirmation}>
            <Input value={formData.passwordConfirmation} password onInput={injectInput('passwordConfirmation')} />
        </Cell>
        <CButton onClick={handleSubmit(onSubmit)}>提交</CButton>
        <View className='row'>
            <View className={styles.login} onClick={() => Taro.navigateTo({url: '/pages/login/index'})}>登录</View>
        </View>
    </View>
}
