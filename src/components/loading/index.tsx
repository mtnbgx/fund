import React from 'react';
import {View} from '@tarojs/components';
import styles from './index.module.less'

interface Props {
    show: boolean
}

export function Loading(props: Props) {

    const loading = <View className={styles.mask}>
        <View className={styles.spinner}>
            <View className={styles.body}>
                <View className={styles.div} />
                <View className={styles.div} />
                <View className={styles.div} />
            </View>
        </View>
    </View>

    return props.show ? loading : null
}
