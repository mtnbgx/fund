import React from "react";
import {Button} from "@tarojs/components";
import './index.less'

interface Props {
  className?: string
  children?: any
  formType?: string
}

export function CButton(props: Props) {
  return <Button className={'c-button ' + props.className} formType='submit'>{props.children}</Button>
}
