import React, { Component } from "react"
import { Input, Carousel, List, Row, Col, Icon, Button } from "antd"
import actions_userPage from "../../actions/userPage";
import actions_search from '../../actions/search'
import { connect } from "react-redux"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";
import Trade from "./Trade"
import { updateProducts } from '../../actions/hello'

class ProductDetails extends Component {

    render() {
        const u = this.props.details
        const images = u.image.map((src) => {
            return (
                <img src={src} alt="" />
            )
        })
        const displayed_name = this.props.allUsers
            .filter((a) => {
                return a.user_id == u.uploaded_by
            })
            .map((u) => {
                return u.displayed_name
            })[0]


        const comments = this.props.allComments
            .some((a) => {
                return a.product_id == u.product_id
            }) ?
            this.props.allComments
                .filter((a) => {
                    return a.product_id == u.product_id
                })[0].comments : []

        const otherUser = this.props.allUsers
            .filter((u) => { return u.displayed_name == this.props.otherUser })
            .map((u) => {
                return (
                    <div style={{ backgroundColor: "#f4fef4", borderRadius: "1vw", display: "flex", flexDirection: "column" }}>
                        <div className="userBanner" style={{ borderRadius: "1vw", backgroundColor: "#c1fcc1", height: "5vh", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                            <p>this is a banner</p>
                        </div>
                        <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
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
                description: u.trade_location,
            },
            {
                title: "Owner",
                description: displayed_name
            },
            {
                title: "Date of Upload",
                description: String(u.uploaded_at),
            },
            {
                title: "Status of Trade",
                description: u.status == 1 ? "Available" : "Trading"
            }
        ]

        const checkMyProduct = () => {
            if (this.props.myUser.user_id) {
                const boo = this.props.myUser.uploaded_products.some((a) => {
                    return a == u.product_id
                })

                const myProductArr = this.props.myUser.uploaded_products

                const offered = u.offered_by.some((offer) => {
                    return myProductArr.some((a) => {
                        return a == offer
                    })
                })

                if (u.status == 1) {
                    if (boo == true && offered == false) {
                        return "myP"
                    } else if (boo == false && offered == true) {
                        return "offered"
                    } else if (boo == false && offered == false) {
                        return "otherP"
                    }
                } else if (u.status == 2) {
                    return "trading"
                } else {
                    return "traded"
                }
            } else {
                return "login"
            }
        }

        return (
            <div key={`details-${u.product_id}`}>
                <Row gutter={100}>
                    <Col span={8}>
                        <div style={{paddingTop:"15px"}}className="imageCarosel">
                            <h5 style={{color:"#000000" , opacity:"850%", marginBottom:"40px"}}>{u.name}</h5>
                            <Carousel autoplay>
                                {images}
                            </Carousel>
                        </div>
                        <Trade details={u} status={checkMyProduct()} />
                    </Col>
                    <Col span={8}>
                        <div className="detailsList">
                            <List
                                itemLayout="vertical"
                                dataSource={details}
                                renderItem={item => (
                                    <List.Item key={`list-${u.product_id}`}>
                                        {item.title != "Owner" &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                            />}
                                        {item.title == "Owner" &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                                // this send the user id to server
                                                onClick={() => { this.props.handleOtherUser(item.description) }}
                                            />}
                                    </List.Item>
                                )}
                            >
                            </List>
                        </div>
                    </Col>



                    <Col span={8}>
                        <div stlye={{ display: "flex", flexDirection: "column", position: "relative" }}>
                      
                            <div className="comments" style={{ marginBottom: "16px",paddingTop:"15px" }}>
                                <h5 style={{color:"#000000" , opacity:"850%", marginBottom:"40px"}}>Comments</h5>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={comments}
                                    renderItem={item => (
                                        <List.Item key={`${u.product_id}comment`}>
                                            <List.Item.Meta
                                                title={<h6>{item.title}</h6>}
                                                description={item.description}
                                            />
                                            {item.content}
                                        </List.Item>
                                    )}
                                >
                                </List>
                                <input style={{width:"220px", marginBottom:"20px", height:"42.74px"}} type="text" onChange={this.props.handleComment} value={this.props.comment} placeholder="Write a comment!"/>
                                
                                {/* <Icon type="upload" onClick={() => { this.props.handleSubmitComment(u.product_id, this.props.comment, this.props.allUsers) }} /> */}
                                <button className="myCmBtn" onClick={() => { this.props.handleSubmitComment(u.product_id, this.props.comment, this.props.allUsers) }}>Submit Comment</button>
                            </div>
                        </div>

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
    const search = state.searchReducer
    return {
        otherUser: u.otherUser,
        users: u.users,
        comment: u.comment,
        allUsers: u.allUsers,
        allComments: u.allComments,
        myUser: u.myUser,
        allProducts: search.allProducts
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
        handleSubmitComment: async (id, comment, allUsers) => {
            try {
                const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/comment", {
                    method: "post",
                    data: { product_id: id, comment: comment },
                    withCredentials: true
                })
                if (res.status == 201) {
                    const products = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/', {
                        method: "get",
                        withCredentials: true
                    })

                    products.data.forEach((u) => {
                        u.openOneModal = false
                        u.openOGModal = false
                        u.openMyGoodModal = false
                        u.openDELModal = false
                    })
                    dispatch(actions_search.storeAllProducts(products.data))
                    dispatch(updateProducts(products.data))
                    const ids = res.data[0].map((u) => { return u[0] })
                    console.log(ownProps.allUsers)
                    const comments = ids.map(async (comment_id) => {
                        const sth = await Axios(`${process.env.REACT_APP_BACKEND_URL}/api/comment/${comment_id}`, {
                            method: "get",
                            withCredentials: true
                        })
                        const comment = sth.data[0]
                        const user = allUsers.filter((u) => {
                            return u.user_id == comment.commentator
                        })[0].displayed_name
                        return {
                            title: user,
                            content: comment.comment,
                            description: comment.comment_at
                        }
                    })

                    Promise.all(comments)
                        .then((results) => {
                            console.log(results)
                            dispatch(actions_userPage.storeAllComments(results, id))
                        })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)