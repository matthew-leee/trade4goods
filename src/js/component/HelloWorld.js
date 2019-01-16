import React from 'react';
import { connect } from "react-redux";
import { hello } from '../actions/hello'


const mapDispatchToProps = (dispatch) => {
    return { fuckyou: () => dispatch(hello()) }
}


const mapStateToProps = state => {
    return { hello: state.hello };
};

const ConnectedHelloWorld = ({ hello, fuckyou }) => {
    return (
        <div>
            <div>Test Component</div>
            <div>{hello}</div>
            <button onClick ={fuckyou}>dont click</button>
            

        </div>
    )
}


const HelloWorld = connect(mapStateToProps,mapDispatchToProps)(ConnectedHelloWorld);

export default HelloWorld;