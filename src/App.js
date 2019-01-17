import React, { Component } from 'react';
import IgFetch from "./IgFetch"
import Home from "./Home"
import AddPhotos from "./AddPhotos/AddPhotos"
import { createStore, Action, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import photoReducers from "./AddPhotos/reducers"
import actions from "./AddPhotos/actions"

import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import './App.css';

const initState = {
  details: [],
  uploadedPhotos: [],
  previewPhotos: []
}

const reducer = photoReducers(initState, actions)

const store = createStore(photoReducers(initState, actions), applyMiddleware(logger))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>

            <div className="links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/addPhotos">Add Photos</Link></p>
              <p><Link to="/igFetch">Fetch ig AC(Beta function)</Link></p>
            </div>

            <Route exact path={"/"} component={Home} />
            <Route path={"/addPhotos"} component={AddPhotos} />
            <Route path={"/igFetch"} component={IgFetch} />

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
