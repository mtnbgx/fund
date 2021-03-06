import React, {Component} from "react";
import {View, Input} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {inject, observer} from "mobx-react";
import {FundStore} from "@/store/fund.store";
import './search.less'

type PageStateProps = {
  store: {
    fundStore: FundStore
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {

  confirm = async (e) => {
    let count = await this.props.store.fundStore.search(e.detail.value)
    if (count === 0) {
      await Taro.showToast({title: '找不到基金', icon: 'none'})
      return
    }
    await Taro.navigateTo({url: '/pages/home/searchResult'})
  }

  render() {
    return <View className='search-page'>
      <View className='center'>
        <Input className='input' placeholder='输入基金代码或者基金名称' autoFocus focus
               onConfirm={this.confirm}
        />
      </View>
    </View>;
  }
}

export default Index
