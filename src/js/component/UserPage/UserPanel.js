import React, { Component } from "react"
import users from "../../../FakeData/users"
import actions_userPage from "../../actions/userPage"
import { connect } from "react-redux"
import { Button } from "antd"
import { Link } from "react-router-dom"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import AddPhotos from "../AddPhotos/AddPhotos";

class UserPanel extends Component {
    render() {
        const u = this.props.myUser
        return (
            <div style={{ width: "15vw", height: "100%", backgroundColor: "#eafeea", display: "flex", justifyContent: "center" }}>
                {u && <div style={{ color: "#2d4b2d", display: "flex", alignItems: "center", flexDirection: "column", paddingTop: "5vh" }}>
                    <img src={u.profile_picture} style={{ width: "10vw", borderRadius: "50%" }} />
                    <h4 style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>{u.displayed_name}</h4>
                    <h6 style={{ paddingBottom: "1vw" }}>Uploaded Products: {u.uploaded_products.length}</h6>
                    <Button style={{ marginBottom: "1vw" }} ghost type="primary">Edit Profile</Button>

                    <Button ghost type="primary" onClick={this.props.handleUploadModal}>Upload New Products</Button>
                    {this.props.openUploadModal &&
                        <Popup open={true} closeOnDocumentClick onClose={this.props.handleUploadModal} >
                            <AddPhotos />
                        </Popup>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    const u = state.userReducer
    return {
        users: u.users,
        openUploadModal: u.openUploadModal,
        myUser: u.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUsers: (users) => {
            dispatch(actions_userPage.storeUsers(users))
        },
        handleUploadModal: () => {
            dispatch(actions_userPage.openUploadModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)