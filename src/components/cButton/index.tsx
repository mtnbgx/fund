import React from "react";
import {Button} from "@tarojs/components";
import './index.less'

interface Props {
  className?: string
  children?: any
}

export function CButton(props: Props) {
  return <Button className={'c-button ' + props.className}>{props.children}</Button>
}
