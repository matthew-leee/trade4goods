import React, { Component } from 'react';
import IgFetch from "./IgFetch"
import Home from "./Home"
import AddPhotos from "./AddPhotos/AddPhotos"
import WrappedAddPhotoForm from "./AddPhotos/form_antd"
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
              <p><Link to="/igFetch">Fetch ig AC(Beta function)</Link></p>
              <p><Link to="/form_antd">Form from antd</Link></p>
            </div>

            <Route exact path={"/"} component={Home} />
            <Route path={"/addPhotos"} component={AddPhotos} />
            <Route path={"/igFetch"} component={IgFetch} />
            <Route path={"/form_antd"} component={WrappedAddPhotoForm} />

          </div>
        </BrowserRouter>
    );
  }
}

export default App;
