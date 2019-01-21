import React, { Component } from "react"

import { connect } from "react-redux"
import MyGoods from "./MyGoods"
import FollowedPost from "./FollowedPost"
import SentReq from "./SentReq"
import ReceivedReq from "./ReceivedReq";
import TradeHistory from "./TradeHistory"

class UserPage extends Component {
    render() {
        return (
            <div className="userPage">
                <MyGoods />
                <FollowedPost />
                <SentReq />
                <ReceivedReq />
                <TradeHistory />
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)