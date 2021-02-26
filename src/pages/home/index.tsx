import React, {Component} from "react";
import {View, Image} from "@tarojs/components";
import Taro from '@tarojs/taro'
import PlusIcon from '@/assets/icon/plus.png'
import {Fund} from "@/api/fund.api";
import {tinyHelp} from '@/utils/tinyHelp';
import {Monitor, MonitorApi} from '@/api/monitor.api';
import {FundItem} from './components/fundItem/fund.item';
import {AddFund} from './components/addFund';
import './index.less'

interface Index {
    state: {
        list: Monitor[],
        form: { visible: boolean, monitorId?: number, fund?: Fund }
    }
}

class Index extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            form: {visible: false}
        }
    }

    async componentDidShow() {
        let res = await MonitorApi.list()
        if (res.success) {
            this.setState({
                list: res.data
            })
        }
    }

    zfColor(zf: string) {
        if (parseInt(zf) > 0) {
            return '#d81e06'
        } else {
            return 'green'
        }
    }

    longPress = async (fund: Fund, monitor: Monitor) => {
        const index = await tinyHelp.showActionSheet([`删除 ${fund.name}`])
        if (index === 0) {
            await MonitorApi.delMonitor(monitor.id)
            await Taro.showToast({title: '删除成功'})
            await this.componentDidShow()
        }
    }


    render() {
        return (
            <View className='home-page'>
                <View className='header'>
                    <View className='title'>基金名称</View>
                    <View className='col'>
                        <View className='jz show-col'>
                            <View className='name'>净值</View>
                            <View className='date'>02-23</View>
                        </View>
                        <View className='gz show-col'>
                            <View className='name'>估值</View>
                            <View className='date'>02-23</View>
                        </View>
                    </View>
                </View>
                <View className='body'>
                    <View className='list'>
                        {
                            this.state.list.map(monitor => {
                                return <FundItem fund={monitor.fund} key={monitor.id}
                                  onLongPress={(fund) => this.longPress(fund, monitor)}
                                  onClick={(fund) => {
                                                     this.setState({form: {visible: true, fund, monitorId: monitor.id}})
                                                 }}
                                />
                            })
                        }
                    </View>
                    <View className='plus' onClick={() => Taro.navigateTo({url: '/pages/home/search'})}>
                        <Image src={PlusIcon} className='plus-icon' />
                        添加自选
                    </View>
                    <View className='ps'>最新估值根据基金持仓和指数走势估算，仅供参考，实际涨跌幅以基金公司披露为准。</View>
                </View>
                <AddFund visible={this.state.form.visible} hide={() => {
                    this.setState({form: {visible: false}})
                }} fund={this.state.form.fund}
                />
            </View>
        );
    }
}

export default Index
