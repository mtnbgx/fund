import React, {ReactNode} from "react";
import {View} from "@tarojs/components";
import styles from './index.module.less'

interface Props {
    visible: boolean
    hide: () => void
    children?: ReactNode
    title?: string
}

export function Dialog(props: Props) {

    const dialog = () => {
        return <View className={styles.dialog} onClick={props.hide}>
            <View className={styles.content + (props.title ? '' : ' ' + styles.not_title)}
              onClick={(e) => e.stopPropagation()} style={{}}
            >
                {props.title && <View className={styles.title}>{props.title}</View>}
                {props.children}
            </View>
        </View>
    }

    return props.visible ? dialog() : null
}
