import React, {ReactNode} from 'react';
import {View} from '@tarojs/components';
import styles from './index.module.less'

interface Props {
    title: string
    children?: ReactNode
    error?: string
}

export function Cell(props: Props) {
    return <View className={styles.cell}>
        <View className={styles.title}>{props.title}</View>
        <View className={styles.content}>
            {props.children}
            {props.error && <View className={styles.error}>{props.error}</View>}
        </View>
    </View>
}
