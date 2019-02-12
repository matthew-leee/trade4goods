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

import { connect } from "react-redux"
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

const loading = require("./js/component/asset/gif/loadingpic.gif")

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navvv />
                    <div style={{ paddingTop: "7vh" }}>
                        {this.props.loading &&
                            <div className="loading"
                                style={{ width: "100vw", height: "93vh", position: "fixed", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 99999999999, backgroundColor: "rgba(200,200,200,0.5)" }}>
                                <img src={loading} alt="loading" />
                            </div>}
                        <Switch>
                            <Route exact path={"/"} component={MainGrid} />
                            {this.props.myUser.user_id && <Route path={"/userPage"} component={NewMain} />}
                            <Route path={"/verifyEmail/:id"} component={VerifyEmail} />
                            <Route path={"/redirect"} component={Rredirect} />
                            <Route path="*" component={NoMatch} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    return {
        myUser: user.myUser,
        loading: user.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);