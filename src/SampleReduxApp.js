import React, { Component } from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import store from './js/store/store'
import HelloWorld from './js/component/HelloWorld'
import RegistrationForm from './js/component/RegistrationForm'
import Terms from './js/component/TermsAndCondition'
import 'antd/dist/antd.css'
// import { Layout, Menu, Breadcrumb, } from 'antd';

import LoginForm from './js/component/LoginForm'



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tryLogin: false,
            tryRegister: false,

        }
        this.handleLoginToggle = this.handleLoginToggle.bind(this)
        this.handleRegToggle = this.handleRegToggle.bind(this)
    }

    handleLoginToggle = () => {
        this.setState({ tryLogin: !this.state.tryLogin })
    }


    handleRegToggle = () => {
        this.setState({ tryRegister: !this.state.tryRegister })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLoginToggle}>Login</button>
                <button onClick={this.handleRegToggle}>Register</button>
                {this.state.tryLogin && <LoginForm handleLogin={this.handleLoginToggle} />}
                {this.state.tryRegister && <RegistrationForm handleRegToggle={this.handleRegToggle} />}
               
            </div>

        );
    }
}

export default App;