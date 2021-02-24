import React, {Component} from "react";
import {View, Image} from "@tarojs/components";
import './home.less'
import PlusIcon from '../../assets/icon/plus.png'
import {Fund, FundApi} from "../../api/fund.api";

interface Index {
  state: {
    list: Fund[]
  }
}

class Index extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      list: []
    }
  }

  async componentDidShow() {
    let res = await FundApi.listByMemberId()
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
              this.state.list.map(fund => {
                return <View className='item' key={fund.id}>
                  <View className='col'>
                    <View className='name'>
                      {fund.name}
                    </View>
                    <View className='code'>{fund.code}</View>
                  </View>
                  <View className='col right'>
                    <View className='jz show-col'>
                      <View className='price'>2.2214</View>
                      <View className='zf' style={{'color': this.zfColor('4.44')}}>4.44%</View>
                      <View className='date'>02-22</View>
                    </View>
                    <View className='gz show-col'>
                      <View className='price'>2.2214</View>
                      <View className='zf' style={{'color': this.zfColor('-4.44')}}>-4.44%</View>
                    </View>
                  </View>
                </View>
              })
            }

          </View>
          <View className='plus'>
            <Image src={PlusIcon} className='plus-icon'></Image>
            添加自选
          </View>
          <View className='ps'>最新估值根据基金持仓和指数走势估算，仅供参考，实际涨跌幅以基金公司披露为准。</View>
        </View>
      </View>
    );
  }
}

export default Index
