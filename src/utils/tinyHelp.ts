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
                    resolve(res.tapIndex)
                },
                fail: function () {
                    resolve(-1)
                }
            }).catch(() => {
                resolve(-1)
            })
        }))
    }
}
