import React, {Component} from "react";
import {View, Input, Form} from "@tarojs/components";
import {inject, observer} from "mobx-react";
import {CButton} from "../../components/cButton";
import './index.less'
import {AppStore} from "../../store/app.store";

type PageStateProps = {
  store: {
    appStore: AppStore
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  formSubmit = async e => {
    // let res = await MemberApi.login(e.detail.value)
    // console.log(res.data)
    this.props.store.appStore.login(e.detail.value)
  }

  render() {
    return (
      <View className='login-page'>
        <View className='header'>
          <View className='title'>登录/注册 更精彩</View>
        </View>
        <View className='form'>
          <Form onSubmit={this.formSubmit}>
            <Input name='username' type='text' placeholder='账号' focus/>
            <Input name='password' type='text' password placeholder='密码'/>
            <CButton className='sub' form-type='submit'>登录</CButton>
            <View className='row'>
              <View className='reg'>注册账号</View>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default Index
