import {action, observable} from "mobx";
import Taro from '@tarojs/taro'
import {LoginParam, MemberApi} from "@/api/member.api";

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
  async login(data: LoginParam) {
    let res = await MemberApi.login(data)
    if (res.success) {
      this.setAuth({access_token: res.data.access_token, time: new Date().getTime() + 36000})
      await Taro.redirectTo({url: '/pages/home/index'})
      await Taro.showToast({title: '登录成功'})
    } else {
      await Taro.showToast({title: '登录失败', icon: 'success'})
    }
  }
}

export const appStore = new AppStore()
