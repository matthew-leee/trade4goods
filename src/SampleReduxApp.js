import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import store from './js/store/store'
import HelloWorld from './js/component/HelloWorld'
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb, } from 'antd';

import LoginForm from './js/component/LoginForm'

const { Header, Content, Footer } = Layout;


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout className="layout">
                    <Header>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                            <Menu.Item key="1">About</Menu.Item>
                            <Menu.Item key="2">Login</Menu.Item>
                            <Menu.Item key="3">Register</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <div>Tag LIST</div>
                        </Breadcrumb>
                        <div style={{ background: 'black', padding: 24, minHeight: 280 }}>
                        <LoginForm />
                            Content
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <div>Footer</div>
                    </Footer>
                </Layout>
            </Provider>
        );
    }
}

export default App;