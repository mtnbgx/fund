import React, {Component} from "react";
import {Signup} from '@/pages/login/components/signup';
import {AppStore} from '@/store/app.store';
import {inject, observer} from 'mobx-react';

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
    render() {
        return <Signup appStore={this.props.store.appStore} />
    }
}

export default Index
