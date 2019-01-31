import React, { Component } from "react"
import { Row, Col } from "antd"
import { connect } from "react-redux"
import UserPanel from "./UserPanel"
import MyGoods from "./MyGoods"
import FollowedPost from "./FollowedPost"
import SentReq from "./SentReq"
import ReceivedReq from "./ReceivedReq";
import TradeHistory from "./TradeHistory"


class UserPage extends Component {
    render() {
        return (
            <div className="userPage">
                <Row type="flex" justify="space-around">
                    <Col xs={24} sm={24} md={3} >
                        <UserPanel />
                    </Col>
                    <Col xs={24} sm={24} md={18}>
                        <Row>
                            <Col xs={24} sm={24} md={12} >
                                <MyGoods />
                            </Col>
                            <Col xs={24} sm={24} md={12} >
                                <FollowedPost />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <SentReq />
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <ReceivedReq />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={3}>
                        <TradeHistory />
                    </Col>
                </Row>


            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)