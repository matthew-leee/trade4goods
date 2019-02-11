import React, { Component } from "react"
import { connect } from "react-redux"
import MyProfStyle from "./style/MyProf"
import actions_newUserPage from "../../actions/newUserPage"
import actions_userPage from "../../actions/userPage"

// antd
import { Icon, Progress } from "antd"

import Axios from "axios"

const err = require('../asset/gif/replaceNoImg.gif')

class MyProf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editName: false,
            editPhone: false,
            name: "",
            phone: null
        }
    }

    // name 

    editName = () => {
        this.setState({
            editName: true
        })
    }

    setName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    SubmitEditName = async () => {
        const data = {
            displayed_name: String(this.state.name),
            phone_number: null,
            profile_picture: null,
        }
        try {
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "put",
                data: data,
                withCredentials: true
            })

            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)
            this.setState({
                editName: false,
                name: ""
            })
        } catch (err) {
            console.log(err)
        }
    }

    // phone 

    editPhone = () => {
        this.setState({
            editPhone: true
        })
    }

    setPhone = (e) => {
        const phone = Number(e.target.value)
        this.setState({
            phone: phone
        })
    }

    SubmitEditPhone = async () => {
        const phone = Number(this.state.phone)
        if ((!phone || String(phone).length > 8) || String(phone).length < 8) {
            alert("Invalid Phone Number")
        } else {
            const data = {
                displayed_name: null,
                phone_number: Number(this.state.phone),
                profile_picture: null,
            }
            try {
                const res = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                    method: "put",
                    data: data,
                    withCredentials: true
                })

                const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                    method: "get",
                    withCredentials: true
                })
                this.props.storeMyUser(user.data)
                this.setState({
                    editPhone: false,
                    phone: null
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

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
                                <Icon type="edit" style={MyProfStyle.icon} onClick={this.props.updatePropic} />
                            </div>}
                        <img style={MyProfStyle.img} src={this.props.myUser.profile_picture ? this.props.myUser.profile_picture : err} alt="" />
                    </div>

                    <div className="details" style={MyProfStyle.details}>

                        <p>displayed name</p>
                        {!this.state.editName &&
                            <div style={{ display: "flex", justifyContent: "space-between", width: "inherit", height: "4vh", alignItems: "center", marginBottom: "2vw" }}>
                                <h4>{this.props.myUser.displayed_name}</h4>
                                <Icon type="edit" onClick={this.editName} />
                            </div>}
                        {this.state.editName &&
                            <div style={{ display: "flex", justifyContent: "space-between", width: "inherit", height: "4vh", alignItems: "center", marginBottom: "2vw" }}>
                                <input onChange={this.setName} />
                                <Icon type="upload" onClick={this.SubmitEditName} />
                            </div>}

                        <p>phone</p>
                        {!this.state.editPhone &&
                            <div style={{ display: "flex", justifyContent: "space-between", width: "inherit", height: "4vh", alignItems: "center", marginBottom: "2vw" }}>
                                <h4>{this.props.myUser.phone_number}</h4>
                                <Icon type="edit" onClick={this.editPhone} />
                            </div>}
                        {this.state.editPhone &&
                            <div style={{ display: "flex", justifyContent: "space-between", width: "inherit", height: "4vh", alignItems: "center", marginBottom: "2vw" }}>
                                <input onChange={this.setPhone} />
                                <Icon type="upload" onClick={this.SubmitEditPhone} />
                            </div>}
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
                        {this.props.myUser.trade_history.length == 0 &&
                            <h5 style={{ padding: 0, marginBottom: 0 }}>You have no Trade History. Start Bartering!</h5>}
                    </div>
                </div>

                {/* <div className="chain" style={MyProfStyle.chain}>asdf</div> */}
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
        },
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        },
        updatePropic: () =>{
            dispatch(actions_newUserPage.updatePropic())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProf) 