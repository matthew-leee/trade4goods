import React from 'react';
import Axios from 'axios';
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import actions_search from "../actions/search"
import actions_userPage from "../actions/userPage"
import {updateFilterArr,updateFilterKey,handleLoginToggle,handleRegToggle} from '../actions/hello'
import { withRouter } from "react-router";

import { Select, Icon } from 'antd';
const _ = require('lodash')
const Option = Select.Option;

function mapDispatchToProps(dispatch) {
    return {
        updateFilterArr: arr => dispatch(updateFilterArr(arr)),
        updateFilterKey: arr=> dispatch(updateFilterKey(arr)),
        handleLoginToggle: a=> dispatch(handleLoginToggle(a)),
        handleRegToggle: a=> dispatch(handleRegToggle(a)),
        storeAllProducts: (products) => {
            dispatch(actions_search.storeAllProducts(products))
        },
        storeAllUsers: (allUsers) => {
            dispatch(actions_userPage.storeAllUsers(allUsers))
        },
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        },
        deleteMyUser: ()=>{
            dispatch(actions_userPage.deleteMyUser())
        }

    };
  }


const mapStateToProps = state => {
    const search = state.roootReducer
    const user = state.userReducer
    const sss = state.searchReducer
    return { 
        productsArr: search.productsArr, 
        isLogin: search.isLogin,
        tryLogin: search.tryLogin,
        tryRegister: search.tryReg,
        myUser: user.myUser,
        refresh: sss.refresh
    };
};

class ConnectedNavvv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
        this.handleNavOnBlur = this.handleNavOnBlur.bind(this)
        this.handleNavPressEnter = this.handleNavPressEnter.bind(this)
    }

    componentWillMount = async () => {
            let isLoggedIn = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/isLoggedIn', {
                method: "get",
                withCredentials: true
            })
            if (isLoggedIn.data) {
            // put userinfo in redux

            // fetch allProducts
            const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

        }
    }
    
    handleNavOnBlur = () =>{

        this.props.history.push('/');
    }


    handleNavPressEnter = (event) =>{
        if(event.key == 'Enter'){
            this.props.history.push('/');
        }
    }

    logout = async() =>{
        try {
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/logout', {
                method: "post",
                withCredentials: true
            })
            this.props.deleteMyUser()
        }catch(err){
            console.log (err)
        }
    }

    handleChange = (value) => {

        let arr = [...value]

        let filterArr = this.props.productsArr.filter(el=>{
            let nameAndTags = [el.name,...el.tags]
            let isInclude =  nameAndTags.some(el => arr.includes(el));


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

      
      componentWillReceiveProps(nextProps){
        console.log (nextProps.productsArr)
        let children = []
        let prodctNameArr = _.chain(nextProps.productsArr)
        .map(el => [el.name,el.tags])
        .flattenDepth(2)
        .countBy(el => el)
        .toPairs()
        .sortBy(el => el[1])
        .reverse()
        .map(el => el[0])
        .value()

        for(let i =0; i < prodctNameArr.length; i++){
            children.push(<Option key={prodctNameArr[i] }>{prodctNameArr[i]}</Option>)
        }
        

        this.setState({arr:children})
        console.log ("set children")

    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{height: "7vh"}}>
    
                <Link  className="navbar-brand d-inline" to="/redirect">Trade4Goods</Link>
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
                        <li className="nav-item" style={{display: "flex", flexDirection:"row"}}>
                            <a className="nav-link" href="">Welcome, {this.props.myUser.displayed_name}</a> 
                            <Link className="nav-link" to="/userPage">User Page</Link>
                            <a className="nav-link" href="" onClick={this.logout}>Logout</a> 
                        </li>}
                    </ul>
                </div>
                {this.props.tryLogin && <LoginForm handleLogin={this.props.handleLoginToggle} />}
                {this.props.tryRegister && <RegistrationForm handleRegToggle={this.props.handleRegToggle} />}
            </nav>
        );
    }
}


const MappedNavv = connect(mapStateToProps,mapDispatchToProps)(ConnectedNavvv);


const Navv = withRouter(MappedNavv);
export default Navv;