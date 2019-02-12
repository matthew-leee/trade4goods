import React, { Component } from "react"
import { connect } from "react-redux";

import TradeStyle from "../style/TradeCards"
import UploadStyle from "../style/Upload"

import actions_userPage from "../../../actions/userPage"
import actions_newUserPage from "../../../actions/newUserPage"

import { Button, Icon } from "antd"

import app from "../firebase"

import uuidv1 from "uuid/v1"
import Axios from "axios"

const err = require('../../asset/gif/replaceNoImg.gif')

class Propic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new: "",
            updated: false,
            original: "",
        }
    }

    componentDidMount = () => {
        this.setState({
            original: this.props.myUser.profile_picture ? this.props.myUser.profile_picture : err
        })
    }

    stopPropagation=(e)=>{
        e.stopPropagation()
    }

    reset = () => {
        this.setState({
            new: "",
        })
    }

    closePropic = () => {
        this.setState({
            new: "",
            updated: false,
            original: "",
        })
        this.props.closePropic()
    }

    handleFiles = (e) => {
        const totalFiles = e.target.files.length
        if (totalFiles < 2) {
            let files = [];
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])
            }
            files.forEach((file) => {
                const id = String(uuidv1())
                if (file.size < 5242880) {
                    this.props.loading()
                    const ref = app.storage().ref();
                    const name = `${id}-${file.name}`
                    const metadata = { contentType: file.type };
                    const task = ref.child(name).put(file, metadata)
                    task
                        .then(snapshot => snapshot.ref.getDownloadURL())
                        .then((url) => {
                            this.setState({
                                new: url
                            })
                            this.props.loading()
                        })
                } else {
                    alert("Your photos exceed 5MB limit")
                }
            })
        } else {
            alert("You can only upload one photo.")
        }
    }

    submitPropic = async () => {
        const data = {
            displayed_name: null,
            phone_number: null,
            profile_picture: this.state.new,
        }
        try {
            this.props.loading()
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
                updated: true
            })
            this.props.loading()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="tradeCards" style={TradeStyle.frame} onClick={this.closePropic}>
                <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                    {!this.state.updated &&
                        <div className="title" style={TradeStyle.inner.titleAConfirm}>
                            <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                Change Profile Picture
                        </h3>
                        </div>}
                        {this.state.updated &&
                        <div className="title" style={TradeStyle.inner.titlePConfirm}>
                            <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                Update Success
                        </h3>
                        </div>}
                    <div className="innerContent" style={TradeStyle.a.frame}>

                        <div className="aItems" style={TradeStyle.a.aItemsConfirm}>

                            <div className="title" style={{ marginBottom: "3vw" }}>
                                <h4>Your Original Profile Picture</h4>
                            </div>

                            <img src={this.state.original}
                                alt=""
                                style={{ width: "16vw", height: "16vw", objectFit: "contain" }}
                            />

                        </div>

                        <div className="arrow" style={TradeStyle.a.arrow}>
                            <Icon type="arrow-right" />
                        </div>

                        <div className="aItems" style={TradeStyle.a.drop}>

                            <div className="title" style={{ marginBottom: "3vw" }}>
                                <h4>New Profile Picture</h4>
                            </div>


                            {!this.state.new &&
                                <label htmlFor="clearImageField" style={UploadStyle.img.plabel}>
                                    <Icon type="upload" style={{ fontSize: "2vw", paddingBottom: "0.5vw" }} />
                                    <p style={{ fontSize: "1vw" }}>Upload Photos</p>
                                    <input type="file"
                                        multiple
                                        onChange={this.handleFiles}
                                        id="clearImageField"
                                        style={{ display: "none" }}
                                    />
                                </label>}
                            {this.state.new &&
                                <img src={this.state.new}
                                    alt=""
                                    style={{ width: "16vw", height: "16vw", objectFit: "contain" }}
                                />}



                        </div>

                    </div>
                    <div className="buttons" style={TradeStyle.inner.buttons}>
                        {(this.state.new && !this.state.updated) && <Button type="danger" onClick={this.reset}>Reset</Button>}
                        {(this.state.new && !this.state.updated) && <Button type="danger" onClick={this.submitPropic}>Submit</Button>}
                        <Button type="primary" onClick={this.closePropic}>Return</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    return {
        myUser: user.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        },
        closePropic: () => {
            dispatch(actions_newUserPage.closePropic())
        },
        loading: ()=>{
            dispatch(actions_userPage.loading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Propic)