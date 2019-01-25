import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SampleApp from './SampleReduxApp'
// import App from './irrelevant/App'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux"
import photoReducer from "./js/reducers/photoReducer"
import userReducer from "./js/reducers/userReducer"
import searchReducer from "./js/reducers/searchReducer"
import logger from "redux-logger";

const rootReducers = combineReducers ({
    photoReducer,
    userReducer,
    searchReducer
})

const store = createStore(rootReducers, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <SampleApp />
        {/* <App /> */}
    </Provider>,
    document.getElementById('root')
);

// Comment out mine if needed

// ReactDOM.render(<SampleApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
