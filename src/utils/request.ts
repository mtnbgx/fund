import Taro from '@tarojs/taro'
import {R} from "@/api/R";
import {appStore} from "@/store/app.store";

export async function request<T = any, U = any>(option: Taro.request.Option<U>): Promise<R<T>> {
    let baseUrl = ''
    if (process.env.TARO_ENV !== 'h5') {
        baseUrl = 'https://fund.niannianmao.com'
        if (process.env.NODE_ENV === 'development') {
            baseUrl = 'http://localhost:3000'
        }
    }
    const res = await Taro.request({
        ...option,
        url: baseUrl + option.url,
        header: {authorization: `Bearer ${appStore.auth.access_token}`}
    })
    if (!res.data.success) {
        if (res.data.errorCode === '403') {
            if (process.env.TARO_ENV === 'weapp') {
                appStore.wxLogin()
            } else {
                await Taro.navigateTo({url: '/pages/login/index'})
            }
        }
    }
    return res.data
}
