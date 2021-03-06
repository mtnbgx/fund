import React, {Component} from "react";
import {View, Image} from "@tarojs/components";
import Taro from '@tarojs/taro'
import PlusIcon from '@/assets/icon/plus.png'
import {Fund} from "@/api/fund.api";
import {tinyHelp} from '@/utils/tinyHelp';
import {Monitor, MonitorApi} from '@/api/monitor.api';
import {UpdateMonitor} from '@/pages/home/components/addFund/updateMonitor';
import dayjs from 'dayjs';
import {FundItem} from './components/fundItem/fund.item';
import './index.less'


interface Index {
    state: {
        list: Monitor[],
        form: { visible: boolean, monitor: Monitor },
        maxjzrq: string
        maxgzrq: string
    }
}

class Index extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            list: [],
            // @ts-ignore
            form: {visible: false},
        }
    }

    async componentDidShow() {
        let res = await MonitorApi.list()
        if (res.success) {
            let maxjzrq = ''
            let maxgzrq = ''
            res.data.map((m, i) => {
                const jzrq = m.fund.PDATE
                const gzrq = m.fund.GZTIME.substring(0, 10)
                if (i === 0) {
                    maxjzrq = jzrq
                    maxgzrq = gzrq
                    return
                }
                if (dayjs(jzrq).isAfter(maxjzrq)) {
                    maxjzrq = jzrq
                }
                if (dayjs(gzrq).isAfter(maxgzrq)) {
                    maxgzrq = gzrq
                }
            })
            this.setState({
                list: res.data,
                maxjzrq: maxjzrq,
                maxgzrq: maxgzrq
            })
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
            <View className='home-page' style={tinyHelp.fullPageHeight()}>
                <View className='header'>
                    <View className='title'>基金名称</View>
                    <View className='col'>
                        <View className='jz show-col'>
                            <View className='name'>净值</View>
                            <View className='date'>{this.state.maxjzrq && this.state.maxjzrq.substring(5, 10)}</View>
                        </View>
                        <View className='gz show-col'>
                            <View className='name'>估值</View>
                            <View className='date'>{this.state.maxgzrq && this.state.maxgzrq.substring(5, 10)}</View>
                        </View>
                    </View>
                </View>
                <View className='body'>
                    <View className='list'>
                        {
                            this.state.list.map(monitor => {
                                return <FundItem key={monitor.id}
                                                 fund={monitor.fund}
                                                 maxjzrq={this.state.maxjzrq}
                                                 maxgzrq={this.state.maxgzrq}
                                                 onLongPress={(fund) => this.longPress(fund, monitor)}
                                                 onClick={() => {
                                                     this.setState({form: {visible: true, monitor}})
                                                 }}
                                />
                            })
                        }
                    </View>
                    <View className='plus' onClick={() => Taro.navigateTo({url: '/pages/home/search'})}>
                        <Image src={PlusIcon} className='plus-icon' />
                        添加
                    </View>
                    <View
                        className='ps'
                    >{this.state.list.length === 0 ? '您还没有添加基金，添加一个试试吧' : '最新估值根据基金持仓和指数走势估算，仅供参考，实际涨跌幅以基金公司披露为准。'}</View>
                </View>
                <UpdateMonitor visible={this.state.form.visible} hide={() => {
                    this.setState({form: {visible: false}})
                }} monitor={this.state.form.monitor} refresh={() => this.componentDidShow()}
                />
            </View>
        );
    }
}

export default Index
