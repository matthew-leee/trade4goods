import React from 'react';
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { updateFilterArr, updateFilterKey, handleLoginToggle, handleRegToggle } from '../actions/hello'
import { withRouter } from "react-router";

import { Select, Icon } from 'antd';
const _ = require('lodash')
const Option = Select.Option;

function mapDispatchToProps(dispatch) {
    return {
        updateFilterArr: arr => dispatch(updateFilterArr(arr)),
        updateFilterKey: arr => dispatch(updateFilterKey(arr)),
        handleLoginToggle: a => dispatch(handleLoginToggle(a)),
        handleRegToggle: a => dispatch(handleRegToggle(a))

    };
}


const mapStateToProps = state => {
    const search = state.roootReducer
    const user = state.userReducer
    return {
        productsArr: search.productsArr,
        isLogin: search.isLogin,
        tryLogin: search.tryLogin,
        tryRegister: search.tryReg,
        myUser: user.myUser
    };
};

class ConnectedNavvv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            productsArr: this.props.productsArr
        }
        this.handleNavOnBlur = this.handleNavOnBlur.bind(this)
        this.handleNavPressEnter = this.handleNavPressEnter.bind(this)
    }



    handleNavOnBlur = () => {
        this.props.history.push('/');
    }


    handleNavPressEnter = (event) => {
        if (event.key == 'Enter') {
            this.props.history.push('/');
        }
    }

    handleChange = (value) => {

        let arr = [...value]

        let filterArr = this.props.productsArr.filter(el => {
            let nameAndTags = [el.name, ...el.tags]
            let isInclude = nameAndTags.some(el => arr.includes(el));


            return isInclude
        })

        if (filterArr.length === 0) {
            filterArr = this.props.productsArr
        }

        //return the filter key word in array
        this.props.updateFilterKey(arr)
        //return filtered products list
        this.props.updateFilterArr(filterArr)
    }


    // componentWillReceiveProps(nextProps) {
    //     let children = []
    //     let prodctNameArr = _.chain(nextProps.productsArr)
    //         .map(el => [el.name, el.tags])
    //         .flattenDepth(2)
    //         .countBy(el => el)
    //         .toPairs()
    //         .sortBy(el => el[1])
    //         .reverse()
    //         .map(el => el[0])
    //         .value()

    //     for (let i = 0; i < prodctNameArr.length; i++) {
    //         children.push(<Option key={prodctNameArr[i]}>{prodctNameArr[i]}</Option>)
    //     }


    //     this.setState({ arr: children })

    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.productsArr !== prevState.productsArr) {
            return { productsArr: nextProps.productsArr };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.productsArr !== this.state.productsArr) {
            let children = []
            let prodctNameArr = _.chain(this.state.productsArr)
                .map(el => [el.name, el.tags])
                .flattenDepth(2)
                .countBy(el => el)
                .toPairs()
                .sortBy(el => el[1])
                .reverse()
                .map(el => el[0])
                .value()

            for (let i = 0; i < prodctNameArr.length; i++) {
                children.push(<Option key={prodctNameArr[i]}>{prodctNameArr[i]}</Option>)
            }
            this.setState({ arr: children })
        }
    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ height: "7vh" }}>

                <Link className="navbar-brand d-inline" to="/">Trade4Goods</Link>
                <Select onInputKeyDown={this.handleNavPressEnter} notFoundContent="Not Found" mode="multiple" style={{ width: '50%' }} defaultValue={[]} placeholder="Please select" onChange={this.handleChange} maxTagCount={3}>
                    {this.state.arr}
                </Select>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto p-2">
                        {this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" href="#">Items</a>
                        </li>}

                        {!this.props.myUser.displayed_name && <li className="nav-item">
                            <a className="nav-link" onClick={this.props.handleLoginToggle}>Login</a>
                        </li>}
                        {!this.props.myUser.displayed_name && <li className="nav-item">
                            <a className="nav-link" onClick={this.props.handleRegToggle} reg={this.handleFinToggle}>Register</a>
                        </li>}
                        {this.props.myUser.displayed_name &&
                            <li className="nav-item" style={{ display: "flex", flexDirection: "row" }}>
                                <a className="nav-link" href="#">Welcome, {this.props.myUser.displayed_name}</a>
                                <Link className="nav-link" to="/userPage">User Page</Link>
                            </li>}
                    </ul>
                </div>
                {this.props.tryLogin && <LoginForm handleLogin={this.props.handleLoginToggle} />}
                {this.props.tryRegister && <RegistrationForm handleRegToggle={this.props.handleRegToggle} />}
            </nav>
        );
    }
}


const MappedNavv = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavvv);


const Navv = withRouter(MappedNavv);
export default Navv;