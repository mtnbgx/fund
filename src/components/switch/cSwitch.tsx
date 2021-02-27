import React from "react";
import {View} from "@tarojs/components";
import styles from "./switch.module.less";

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

function CSwitch(props: SwitchProps) {
  return (
    <View
      className={styles.switch + (props.value ? ` ${styles.switch_on}` : "")}
      onClick={() => props.onChange && props.onChange(!props.value)}
    />
  );
}

export default CSwitch;
