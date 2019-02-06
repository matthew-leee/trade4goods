import React, { Component } from "react"
import { connect } from "react-redux"
import MyProfStyle from "./style/MyProf"
import actions_newUserPage from "../../actions/newUserPage"

// antd
import { Icon, Progress } from "antd"

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
                        <img style={MyProfStyle.img} src="https://instagram.fhkg10-1.fna.fbcdn.net/vp/54f1a6e2759141c23a4d3a9045c8d77d/5CDDE8C2/t51.2885-15/e35/42003025_325826901577405_8149234815467752856_n.jpg?_nc_ht=instagram.fhkg10-1.fna.fbcdn.net" alt="" />
                    </div>

                    <div className="details" style={MyProfStyle.details}>
                        <p>name</p>
                        <h4 style={MyProfStyle.detailsh4}>{this.props.myUser.displayed_name}</h4>
                        <p>phone</p>
                        <h4 style={MyProfStyle.detailsh4}>{this.props.myUser.phone_number}</h4>
                    </div>

                </div>


                <div className="stat" style={MyProfStyle.stat}>
                    <div className="title" style={MyProfStyle.statTitle}>
                        <h5 style={{ padding: 0, marginLeft: "0.5vw", marginBottom: 0 }}>Stats</h5>
                    </div>
                    <div className="stat1" style={MyProfStyle.stat1}>
                        <div className="credProgress" style={MyProfStyle.cred}>
                            <Progress type="circle" percent={this.props.myUser.credibility * 10} />
                            <p style={{ marginBottom: 0, marginTop: "1vw" }}>Your Trade Credibility</p>
                        </div>
                    </div>
                    <div className="stat2" style={MyProfStyle.stat2}>
                        <div className="credProgress" style={MyProfStyle.cred}>
                            <Progress type="circle" percent={this.props.myUser.credibility * 10} />
                            <p style={{ marginBottom: 0, marginTop: "1vw" }}>Trader's Level</p>
                        </div>
                    </div>
                </div>

                <div className="history" style={MyProfStyle.history}>
                    <div className="title" style={MyProfStyle.historyTitle}>
                        <h5 style={{ padding: 0, marginLeft: "0.5vw", marginBottom: 0 }}>Trade History</h5>
                    </div>
                    <div className="details" style={MyProfStyle.historyDetails}>
                        {!this.props.myUser.trade_history &&
                        <h5 style={{ padding: 0,  marginBottom: 0 }}>You have no Trade History. Start Bartering!</h5>}
                    </div>
                </div>

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