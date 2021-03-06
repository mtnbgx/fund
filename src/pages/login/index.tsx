import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {AppStore} from "@/store/app.store";
import {Login} from '@/pages/login/components/login';


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
        return (
            <Login appStore={this.props.store.appStore} />
        );
    }
}

export default Index
