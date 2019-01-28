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
            <div className="userPage" style={{display: "flex", flexDirection: "row", overflowX: "scroll"}}>
               

                    <UserPanel />

                    <div style={{width: "80vw"}}>
                        <Row>
                            <Col span={12} >
                                <MyGoods />
                            </Col>
                            <Col span={12} >
                                <FollowedPost />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <SentReq />
                            </Col>
                            <Col span={10}>
                                <ReceivedReq />
                            </Col>
                            <Col span={4}>
                                <TradeHistory />
                            </Col>
                        </Row>
                    </div>

                
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