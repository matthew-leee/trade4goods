import React from 'react';
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import Search from "./Search/Search"


const mapStateToProps = state => {
    return { isLogin: state.isLogin };
};

class ConnectedNavvv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tryLogin: false,
            tryRegister: false,

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


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    
                <Link className="navbar-brand d-inline" to="/">Trade4Goods</Link>
                {/* <div class="input-group" style={{width:"30%"}}>
                    <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button"><svg viewBox="0 0 24 24" aria-label="Search" class="icon___2_Tkk icon___1OCig" color="#FFFFFF" style={{width:"20px",height:"20px"}}> <path d="M9.3061 18.6122C4.1665 18.6122 0 14.4458 0 9.3062 0 4.1664 4.1665 0 9.3061 0c5.1397 0 9.3061 4.1665 9.3061 9.3061 0 5.1397-4.1664 9.3061-9.306 9.3061zm0-.9795c4.5986 0 8.3266-3.728 8.3266-8.3266 0-4.5986-3.728-8.3265-8.3266-8.3265C4.7075.9796.9796 4.7076.9796 9.306c0 4.5986 3.728 8.3266 8.3265 8.3266zm6.021-1.6129a.4898.4898 0 1 1 .6927-.6927l7.8367 7.8368a.4898.4898 0 1 1-.6926.6926l-7.8368-7.8367z" fill="#FFFFFF" fill-rule="nonzero"></path></svg></button>
                    </div>
                </div> */}
                <Search />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto p-2">
                        {this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" href="#">Items</a>
                        </li>}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
                        {!this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" onClick={this.handleLoginToggle}>Login</a>
                        </li>}
                        {!this.props.isLogin && <li className="nav-item">
                            <a className="nav-link" onClick={this.handleRegToggle}>Register</a>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/addPhotos">Add Photos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/userPage">User Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">Search</Link>
                        </li>
                    </ul>
                </div>
                {this.state.tryLogin && <LoginForm handleLogin={this.handleLoginToggle} />}
                {this.state.tryRegister && <RegistrationForm handleRegToggle={this.handleRegToggle} />}
            </nav>
        );
    }
}


const Navv = connect(mapStateToProps)(ConnectedNavvv);



export default Navv;