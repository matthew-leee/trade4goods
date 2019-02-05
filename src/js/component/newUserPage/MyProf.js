import React, { Component } from "react"
import { connect } from "react-redux"
import MyProfStyle from "./style/MyProf"
import actions_newUserPage from "../../actions/newUserPage"

// antd
import { Icon } from "antd"

class MyProf extends Component {

    render() {
        return (
            <div className="MyProf" style={MyProfStyle.MyProf}>
                <div className="profile" style={MyProfStyle.profile}>

                    <div className="img" style={MyProfStyle.imgClass}>
                        {!this.props.imgHover &&
                            <div className="imgOverlay" style={MyProfStyle.imgOverlay} onMouseEnter={this.props.handleImgHover}>
                            </div>}
                        {this.props.imgHover &&
                            <div className="imgOverlay" style={MyProfStyle.imgHover} onMouseLeave={this.props.handleImgHover}>
                                <Icon type="edit" style={MyProfStyle.icon} />
                            </div>}
                        <img style={MyProfStyle.img} src="https://instagram.fhkg10-1.fna.fbcdn.net/vp/857f8f78aec79e847df2015101da19ed/5CF95050/t51.2885-15/e35/50875616_283040825708747_6865581596424783698_n.jpg?_nc_ht=instagram.fhkg10-1.fna.fbcdn.net" alt="" />
                    </div>
                    <div className="details" style={MyProfStyle.details}>
                        <p>name</p>
                        <h4 style={MyProfStyle.detailsh4}>{this.props.myUser.displayed_name}</h4>
                        <p>phone</p>
                        <h4 style={MyProfStyle.detailsh4}>{this.props.myUser.phone_number}</h4>
                    </div>
                </div>
                <div className="stat" style={MyProfStyle.stat}>
                    some shig
                    </div>
                <div className="history" style={MyProfStyle.history}>shit</div>
                <div className="chain" style={MyProfStyle.chain}>asdf</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    const nu = state.newUserReducer
    return {
        myUser: user.myUser,
        imgHover: nu.imgHover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleImgHover: () => {
            dispatch(actions_newUserPage.imgHover())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProf) 