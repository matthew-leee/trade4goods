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
            <div className="userPage" style={{display: "flex", flexDirection: "row"}}>
               

                    <UserPanel />

                    <div style={{width: "70vw", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                        <Row>
                            <Col span={12} >
                                <MyGoods />
                            </Col>
                            <Col span={12} >
                                <FollowedPost />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <SentReq />
                            </Col>
                            <Col span={12}>
                                <ReceivedReq />
                            </Col>
                        </Row>
                    </div>

                    <TradeHistory />
                
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