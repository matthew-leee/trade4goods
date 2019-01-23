import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import SampleApp from './SampleReduxApp'
import App from './App'
import * as serviceWorker from './serviceWorker';
import { createStore, Action, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux"
import photoReducers from "./AddPhotos/reducers"
import userReducers from "./UserPage/reducers"
import logger from "redux-logger";

const rootReducers = combineReducers ({
    photoReducers,
    userReducers
})

const store = createStore(rootReducers, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        {/* <SampleApp /> */}
        <App />
    </Provider>,
    document.getElementById('root')
);

// Comment out mine if needed

// ReactDOM.render(<SampleApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
