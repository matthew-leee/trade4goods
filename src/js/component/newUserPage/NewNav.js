import React, { Component } from "react"
import { connect } from "react-redux";

// css
import NewNavStyle from "./style/NewNav"
import actions_newUserPage from "../../actions/newUserPage";

class NewNav extends Component {
    render() {
        return (
            <div className="content">
                <ul>
                    <li>
                        {this.props.nav.MyProf && <p style={NewNavStyle.pA} onClick={() => { this.props.handleNav("MyProf") }}>My Profile</p>}
                        {!this.props.nav.MyProf && <p style={NewNavStyle.p} onClick={() => { this.props.handleNav("MyProf") }}>My Profile</p>}
                    </li>
                    <li>
                        {this.props.nav.MyG && <p style={NewNavStyle.pA} onClick={() => { this.props.handleNav("MyG") }}>My Goods</p>}
                        {!this.props.nav.MyG && <p style={NewNavStyle.p} onClick={() => { this.props.handleNav("MyG") }}>My Goods</p>}
                    </li>
                    <li>
                        {this.props.nav.FollowedG && <p style={NewNavStyle.pA} onClick={() => { this.props.handleNav("FollowedG") }}>Followed Goods</p>}
                        {!this.props.nav.FollowedG && <p style={NewNavStyle.p} onClick={() => { this.props.handleNav("FollowedG") }}>Followed Goods</p>}
                    </li>
                    <li>
                        {this.props.nav.Upload && <p style={NewNavStyle.pA} onClick={() => { this.props.handleNav("Upload") }}>Upload New Products</p>}
                        {!this.props.nav.Upload && <p style={NewNavStyle.p} onClick={() => { this.props.handleNav("Upload") }}>Upload New Products</p>}
                    </li>
                </ul>
                {/* <button onClick={this.props.handleClick}>Click to change</button> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const nu = state.newUserReducer
    return {
        nav: nu.nav
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleNav: (tag) => {
            dispatch(actions_newUserPage.handleNav(tag))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNav)