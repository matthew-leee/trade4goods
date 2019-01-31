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
import roootReducer from "./js/reducers/rootReducer"
import tradeReducer from "./js/reducers/tradeReducer"
import logger from "redux-logger";
require('dotenv').config()


const rootReducers = combineReducers({
    photoReducer,
    userReducer,
    searchReducer,
    roootReducer,
    tradeReducer
})

const store = createStore(rootReducers, applyMiddleware(logger))

ReactDOM.render(
    
        <Provider store={store}>
            <SampleApp />
            {/* <App /> */}
        </Provider>,
    
    document.getElementById('root')
    
);

serviceWorker.unregister();
