import React, { Component } from 'react';
import IgFetch from "./IgFetch"
import Home from "./Home"
import WrappedAddPhotoForm from "./js/component/AddPhotos/AddPhotos"
import UserPage from "./js/component/UserPage/main"
import Search from "./js/component/Search/search"
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import "antd/dist/antd.css"

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>

            <div className="links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/addPhotos">Add Photos</Link></p>
              <p><Link to="/userPage">User Page</Link></p>
              <p><Link to="/search">Search</Link></p>
              <p><Link to="/igFetch">Fetch ig AC(Beta function)</Link></p>
            </div>

            <Route exact path={"/"} component={Home} />
            <Route path={"/addPhotos"} component={WrappedAddPhotoForm} />
            <Route path={"/userPage"} component={UserPage} />
            <Route path={"/search"} component={Search} />
            <Route path={"/igFetch"} component={IgFetch} />

          </div>
        </BrowserRouter>
    );
  }
}

export default App
