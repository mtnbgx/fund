import React, {Component} from 'react'
import {Provider} from 'mobx-react'
import counterStore from './store/counter'
import {appStore} from "./store/app.store";
import {fundStore} from "./store/fund.store";
import './app.less'


const store = {
  counterStore,
  appStore,
  fundStore
}

class App extends Component {
  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
