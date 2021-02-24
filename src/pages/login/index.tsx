import React, {Component} from "react";
import {View, Input} from "@tarojs/components";
import './index.less'
import {CButton} from "../../components/cButton";

class Index extends Component {
  render() {
    return (
      <View className='login-page'>
        <View className='header'>
          <View className='title'>登录/注册 更精彩</View>
        </View>
        <View className='form'>
          <Input type='text' placeholder='账号' focus />
          <Input type='text' password placeholder='密码' />
          <CButton className='sub'>登录</CButton>
          <View className='row'>
            <View className='reg'>注册账号</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index
