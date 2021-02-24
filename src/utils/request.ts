import Taro from '@tarojs/taro'
import {R} from "../api/R";
import {appStore} from "../store/app.store";

export async function request<T = any, U = any>(option: Taro.request.Option<U>): Promise<R<T>> {
  const res = await Taro.request({...option, header: {authorization: `Bearer ${appStore.auth.access_token}`}})
  if (!res.data.success) {
    if (res.data.errorCode === '403') {
      await Taro.navigateTo({url: '/pages/login/index'})
    }
  }
  return res.data
}
