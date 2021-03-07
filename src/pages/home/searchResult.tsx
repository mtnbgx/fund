import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import {FundStore} from "@/store/fund.store";
import {Fund} from "@/api/fund.api";
import {CButton} from "@/components/cButton";
import {AddFund} from "./components/addFund/addMonitor";
import {FundItem} from './components/fundItem/fund.item';


type PageStateProps = {
    store: {
        fundStore: FundStore
    }
}

interface Index {
    props: PageStateProps;
    state: { visible: boolean, fund?: Fund }
}

@inject('store')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidShow() {
        if (this.props.store.fundStore.list.length === 0) {
            Taro.redirectTo({url: '/pages/home/search'})
        }
    }

    action = (fund: Fund) => {
        return <CButton onClick={() => {
            this.setState({fund, visible: true})
        }}
          size='mini'
        >加自选</CButton>
    }


    render() {
        return <View>
            {
                this.props.store.fundStore.list.map(fund => {
                    return <FundItem fund={fund} key={fund.id} action={this.action} />
                })
            }
            {this.state.fund && <AddFund visible={this.state.visible} fund={this.state.fund}
              hide={() => this.setState({visible: false})}
            />}
        </View>;
    }
}

export default Index
