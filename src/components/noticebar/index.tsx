import React from 'react';
import {View} from '@tarojs/components';
import styles from './index.module.less'

interface Props {
    children?: any
    onClick?: () => void
}

export function NoticeBar(props: Props) {
    return <View className={styles.notice} onClick={props.onClick}>{props.children}</View>
}
