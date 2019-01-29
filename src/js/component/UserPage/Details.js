import React, { Component } from "react"
import { Carousel, List, Row, Col } from "antd"
import actions_userPage from "../../actions/userPage";
import { connect } from "react-redux"
import users from "../../../FakeData/users"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";

class ProductDetails extends Component {
    constructor(props){
        super(props)
        this.user="user1"
    }

    handleSubmitComment = async () => {
        try {
            const res = Axios.post("https://localhost:8443/api/comment", {
                product_id: this.props.details.product_id,
                comment: this.props.comment
            })
            this.props.handleSubmitComment()
        } catch (err) {
            console.log (err.response.data)
        }
    }

    render() {
        const u = this.props.details
        const images = u.image.map((src) => {
            return (
                <img src={src} alt="" />
            )
        })
        const otherUser = this.props.users
            .filter((u) => { return u.displayed_name == this.props.otherUser })
            .map((u) => {
                return (
                    <div style={{ backgroundColor: "#f4fef4", borderRadius: "1vw", display: "flex", flexDirection: "column" }}>
                        <div className="userBanner" style={{ borderRadius: "1vw", backgroundColor: "#c1fcc1", height: "5vh", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <p>this is a banner</p>
                        </div>
                        <div style={{paddingLeft: "2vw", paddingRight: "2vw"}}>
                            <img src={u.profile_picture} style={{ marginTop: "2vh", marginBottom: "2vh", width: "10vw", borderRadius: "50%" }} />
                            <h4 style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>{u.displayed_name}</h4>
                            <h4 style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>Credibility: {u.credibility}</h4>
                        </div>
                    </div>
                )
            })
        const details = [
            {
                title: "Product Name",
                description: u.name,
            },
            {
                title: "Product Description",
                description: u.description,
            },
            {
                title: "Preferred Trade Location",
                description: `${u.trade_location[0]}, ${u.trade_location[1]}`,
            },
            {
                title: "Owner",
                description: u.uploaded_by,
            },
            {
                title: "Date of Upload",
                description: String(u.uploaded_at),
            },
            {
                title: "Status of Trade",
                description: u.status == 1 ? "Trading" : "Traded",
            }
        ]
        const comments = u.comments.map((a) => {
            return {
                title: a.user,
                description: a.comment
            }
        })
        return (
            <div>
                <Row gutter={100}>
                    <Col span={8}>
                        <div className="imageCarosel">
                            <h2>{u.name}</h2>
                            <Carousel autoplay>
                                {images}
                            </Carousel>
                        </div>
                    </Col>
                    <Col span={8}>
                        <h4>Product Details</h4>
                        <div className="detailsList">
                            <List
                                itemLayout="vertical"
                                dataSource={details}
                                renderItem={item => (
                                    <List.Item key={u.product_id}>
                                        {item.title != "Owner" &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                            />}
                                        {item.title == "Owner" &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                                onClick={() => { this.props.handleOtherUser(item.description) }}
                                            />}
                                    </List.Item>
                                )}
                            >
                            </List>
                        </div>
                    </Col>



                    <Col span={8}>
                        <h4>Comments</h4>
                        <List
                            itemLayout="horizontal"
                            dataSource={comments}
                            renderItem={item => (
                                <List.Item key={`${u.product_id}comment`}>
                                    <List.Item.Meta
                                        title={<h5>{item.title}</h5>}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        >
                        </List>
                        <input type="text" onChange={this.props.handleComment} value={this.props.comment} / >
                        <button onClick={this.props.handleSubmitComment}>Submit Comment</button>
                    </Col>
                </Row>

                {this.props.otherUser &&
                    <Popup open={true} closeOnDocumentClick onClose={this.props.handleCloseOtherUser}>
                        <div>
                            <a style={popUpCloseTag} onClick={this.props.handleCloseOtherUser}>&times;</a>
                            {otherUser}
                        </div>
                    </Popup>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const u = state.userReducer
    return {
        otherUser: u.otherUser,
        users: u.users,
        comment: u.comment
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleOtherUser: (user) => {
            dispatch(actions_userPage.showOtherUser(user))
        },
        handleCloseOtherUser: () => {
            dispatch(actions_userPage.closeOtherUser())
        },
        handleComment: (e) => {
            const input = e.target.value
            dispatch(actions_userPage.setComment(input))
        },
        handleSubmitComment: ()=>{
            dispatch(actions_userPage.submitComment())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)