import React, { Component } from "react"
import { Carousel, List, Row, Col, Icon, Button } from "antd"
import actions_userPage from "../../actions/userPage";
import actions_search from '../../actions/search'
import { connect } from "react-redux"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";
import Trade from "./Trade"

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

        console.log(this.props)

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
                } else {
                    return "na"
                }
            } else {
                return "login"
            }
        }

        return (
            <div key={`details-${u.product_id}`}>
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

                            <div className="comments" style={{ marginBottom: "2vh" }}>
                                <h4>Comments</h4>
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
                                <input type="text" onChange={this.props.handleComment} value={this.props.comment} />
                                {/* <Icon type="upload" onClick={() => { this.props.handleSubmitComment(u.product_id, this.props.comment, this.props.allUsers) }} /> */}
                                <button onClick={() => { this.props.handleSubmitComment(u.product_id, this.props.comment, this.props.allUsers) }}>Submit Comment</button>
                            </div>

                            <Trade details={u} status={checkMyProduct()} />


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
                const res = await Axios("https://localhost:8443/api/comment", {
                    method: "post",
                    data: { product_id: id, comment: comment },
                    withCredentials: true
                })
                if (res.status == 201) {
                    const products = await Axios('https://localhost:8443/api/allProducts/', {
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
                    const ids = res.data[0].map((u) => { return u[0] })
                    console.log(ownProps.allUsers)
                    const comments = ids.map(async (comment_id) => {
                        const sth = await Axios(`https://localhost:8443/api/comment/${comment_id}`, {
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