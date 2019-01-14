import React, { Component } from 'react';
import IgFetch from "./IgFetch"
import Home from "./home"
import AddPhotos from "./addPhotos"
import * as ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Link,
  match
} from 'react-router-dom'
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path={"/"} component = {Home} />
        <Route path = {"/addPhotos"} component = {AddPhotos} />
        <Route path = {"/igFetch"} component = {IgFetch} />
      </BrowserRouter>
    );
  }
}

export default App;
