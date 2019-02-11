import React, { Component } from 'react';

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navvv from './js/component/Navvv'
import MainGrid from './js/component/MainGrid'
import NoMatch from './js/component/NoMatch'
import VerifyEmail from './js/component/VerifyEmail'
import Rredirect from "./js/component/Rredirect"

import AddPhotos from "./js/component/AddPhotos/AddPhotos"
import UserPage from "./js/component/UserPage/main"
import NewMain from "./js/component/newUserPage/NewMain"
import "./App.css"

import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navvv />
                    <div style={{paddingTop: "7vh"}}>
                    <Switch>
                        <Route exact path={"/"} component={MainGrid} />
                        <Route path={"/addPhotos"} component={AddPhotos} />
                        {/* <Route path={"/userPage"} component={UserPage} /> */}
                        <Route path={"/userPage"} component={NewMain} />
                        <Route path={"/verifyEmail/:id"} component={VerifyEmail} />
                        <Route path={"/redirect"} component={Rredirect} />
                        <Route path="*" component={NoMatch}/>
                    </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;