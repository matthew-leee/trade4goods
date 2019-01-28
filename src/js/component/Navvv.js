import React from 'react';
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import Search from "./Search/search"


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
                <Search />
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
                            <Link className="nav-link" to="/addPhotos">Add Photos</Link>
                        </li>
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


const Navv = connect(mapStateToProps)(ConnectedNavvv);



export default Navv;