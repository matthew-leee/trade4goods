import React from 'react';
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import {updateFilterArr,updateFilterKey} from '../actions/hello'
import Search from "./Search/search"
import { Select } from 'antd';
const _ = require('lodash')
const Option = Select.Option;

function mapDispatchToProps(dispatch) {
    return {
        updateFilterArr: arr => dispatch(updateFilterArr(arr)),
        updateFilterKey: arr=> dispatch(updateFilterKey(arr))
    };
  }


const mapStateToProps = state => {
    const search = state.roootReducer
    return { productsArr: search.productsArr, isLogin: search.isLogin };
};

class ConnectedNavvv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tryLogin: false,
            tryRegister: false,
            arr: []
        }
        this.handleLoginToggle = this.handleLoginToggle.bind(this)
        this.handleRegToggle = this.handleRegToggle.bind(this)
    }

    handleLoginToggle = () => {
        this.setState({ tryLogin: !this.state.tryLogin })
    }


    handleRegToggle = () => {
        this.setState({ tryRegister: !this.state.tryRegister })
    }

    handleChange = (value) => {

        let arr = [...value]

        let filterArr = this.props.productsArr.filter(el=>{
            return arr.includes(el.name)
        })
        if (filterArr.length === 0) {
            filterArr = this.props.productsArr
        }
        console.log(filterArr)
       
        //return the filter key word in array
       this.props.updateFilterKey(arr)
       //return filtered products list
       this.props.updateFilterArr(filterArr)
      }

      
      componentWillReceiveProps(nextProps){
        let children = []
        let prodctNameArr = _.chain(nextProps.productsArr)
        .map(el => el.name)
        .countBy(el => el)
        .toPairs()
        .sortBy(el => el[1])
        .reverse()
        .map(el => el[0])
        .value()
        for(let i =0; i < prodctNameArr.length; i++){
            children.push(<Option key={prodctNameArr[i] }>{prodctNameArr[i]}</Option>)
        }

        let prodctTagsArr = _.chain(nextProps.productsArr)
        .map(el => el.tags)
        .flatten()
        .countBy(el => el)
        .toPairs()
        .sortBy(el => el[1])
        .reverse()
        .map(el => el[0])
        .value()
        console.log(prodctTagsArr)
        for(let i =0; i < prodctTagsArr.length; i++){
            children.push(<Option key={prodctTagsArr[i]}>{prodctTagsArr[i]}</Option>)
        }

        this.setState({arr:children})

    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{height: "7vh"}}>
    
                <Link className="navbar-brand d-inline" to="/">Trade4Goods</Link>
                <Select mode="multiple" style={{ width: '50%' }} defaultValue={[]}placeholder="Please select" onChange={this.handleChange} maxTagCount={3}>
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

                        {!this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" onClick={this.handleLoginToggle}>Login</a>
                        </li>}
                        {!this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" onClick={this.handleRegToggle} reg={this.handleFinToggle}>Register</a>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/userPage">User Page</Link>
                        </li>
                    </ul>
                </div>
                {this.state.tryLogin && <LoginForm handleLogin={this.handleLoginToggle} />}
                {this.state.tryRegister && <RegistrationForm handleRegToggle={this.handleRegToggle} />}
            </nav>
        );
    }
}


const Navv = connect(mapStateToProps,mapDispatchToProps)(ConnectedNavvv);



export default Navv;