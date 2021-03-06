import Taro from '@tarojs/taro';

export const tinyHelp = {
    /**
     * 取消选择返回-1 不然就是itemList下标
     * @param itemList
     */
    showActionSheet: (itemList: string[]): Promise<number> => {
        return new Promise((resolve => {
            Taro.showActionSheet({
                itemList,
                success: function (res) {
                    // @ts-ignore
                    resolve(res.tapIndex ? res.tapIndex : res.index)
                },
                fail: function () {
                    resolve(-1)
                }
            }).catch(() => {
                resolve(-1)
            })
        }))
    },
    fullPageHeight() {
        if (process.env.TARO_ENV === 'h5') {
            return 'height: calc(100vh - 50Px);'
        } else {
            return 'height: 100vh;'
        }
    },
    login(): Promise<string> {
        return new Promise((resolve, reject) => {
            Taro.login({
                success: function (res) {
                    if (res.code) {
                        resolve(res.code)
                    } else {
                        console.log('登录失败！' + res.errMsg)
                        reject(res.errMsg)
                    }
                }
            })
        })
    }
}
