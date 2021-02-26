import React from "react";
import {Button} from "@tarojs/components";
import styles from './index.module.less'

type FormType = 'submit' | 'reset'
type Size = 'normal' | 'mini'

interface Props {
  className?: string
  children?: any
  formType?: FormType
  size?: Size
  onClick?: () => void
}

export function CButton(props: Props) {
  let className = `${styles.button} `
  if (props.size === 'mini') {
    className += `${styles.mini} `
  }
  className += props.className
  return <Button className={className} formType={props.formType} onClick={props.onClick}>{props.children}</Button>
}
