import React, { Component } from 'react';

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navvv from './js/component/Navvv'
import MainGrid from './js/component/MainGrid'

import WrappedAddPhotoForm from "./js/component/AddPhotos/AddPhotos"
import UserPage from "./js/component/UserPage/main"
import Search from "./js/component/Search/search"

import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navvv />
                    <Route exact path={"/"} component={MainGrid} />
                    <Route path={"/addPhotos"} component={WrappedAddPhotoForm} />
                    <Route path={"/userPage"} component={UserPage} />
                    <Route path={"/search"} component={Search} />
                </div>
            </BrowserRouter>


        );
    }
}

export default App;