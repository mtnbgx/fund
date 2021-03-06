import {action, observable} from "mobx";
import Taro from '@tarojs/taro'
import {LoginParam, MemberApi} from "@/api/member.api";
import {tinyHelp} from '@/utils/tinyHelp';

interface Auth {
    access_token: string
    time: number
}

export class AppStore {
    @observable
    auth: Auth

    constructor() {
        this.auth = Taro.getStorageSync('auth')
    }

    setAuth(auth: Auth) {
        this.auth = auth
        Taro.setStorageSync('auth', auth)
    }

    @action
    async wxLogin() {
        try {
            const code = await tinyHelp.login()
            let res = await MemberApi.wxLogin(code)
            if (res.success) {
                this.setAuth({access_token: res.data.access_token, time: new Date().getTime() + 36000})
                await Taro.reLaunch({url: '/pages/home/index'})
                await Taro.showToast({title: '登录成功'})
            } else {
                await Taro.showToast({title: '登录失败', icon: 'success'})
            }
        } catch (e) {
            console.log(e)
        }

    }

    @action
    async login(data: LoginParam) {
        let res = await MemberApi.login(data)
        if (res.success) {
            this.setAuth({access_token: res.data.access_token, time: new Date().getTime() + 36000})
            await Taro.reLaunch({url: '/pages/home/index'})
            await Taro.showToast({title: '登录成功'})
        } else {
            await Taro.showToast({title: '登录失败', icon: 'success'})
        }
    }

    @action
    async signup(data: LoginParam) {
        let res = await MemberApi.signup(data)
        if (res.success) {
            this.setAuth({access_token: res.data.access_token, time: new Date().getTime() + 36000})
            await Taro.reLaunch({url: '/pages/home/index'})
            await Taro.showToast({title: '注册成功，进入'})
        } else {
            await Taro.showToast({title: '注册失败', icon: 'success'})
        }
    }
}

export const appStore = new AppStore()
