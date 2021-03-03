import React from 'react';
import {View, PickerView, PickerViewColumn} from '@tarojs/components';

interface Props {
    value: number[]
}

function Index(props: Props) {

    const onChange = (e) => {
        console.log(e)
    }

    return <View>
        <PickerView indicatorStyle='height: 50px;'
                    style='width: 100%; height: 300px;' value={props.value}
                    onChange={onChange}
        >
            <PickerViewColumn>
                <View>dd1</View>
                <View>dd2</View>
                <View>dd3</View>
            </PickerViewColumn>
        </PickerView>
    </View>
}

export const CPickerView = Index
