import React, { Component } from 'react';

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navvv from './js/component/Navvv'
import MainGrid from './js/component/MainGrid'

import AddPhotos from "./js/component/AddPhotos/AddPhotos"
import UserPage from "./js/component/UserPage/main"
import "./App.css"

import {
    BrowserRouter,
    Route
} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navvv />
                    <div style={{marginTop: "8vh"}}>
                        <Route exact path={"/"} component={MainGrid} />
                        <Route path={"/addPhotos"} component={AddPhotos} />
                        <Route path={"/userPage"} component={UserPage} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;