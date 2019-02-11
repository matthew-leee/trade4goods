import React, { Component } from "react"
import { List, Row, Col } from "antd"
import actions_userPage from "../../../actions/userPage";
import actions_search from '../../../actions/search'
import { connect } from "react-redux"
import Axios from "axios";
// import Trade from "./Trade"
import BigCardsStyle from "../style/BigCards"
import { updateProducts } from '../../../actions/hello'

import Trade from "./Trade"
import Carousel from "./Carousel"

const err = require('../../asset/gif/replaceNoImg.gif')

class ProductDetails extends Component {

    render() {
        const u = this.props.details
        const status = this.props.status
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
        
        const detail = BigCardsStyle.details
        return (
            <div key={`details-${u.product_id}`} style={detail.outer}>

                {/* image */}
                <div style={detail.inner.img} className="imageCarosel">
                    <div className="header"
                        style={detail.inner.imgHeader}>
                        <h4 style={{ padding: 0, margin: 0 }}>{u.name}</h4>
                        <Trade details={u} status={status} />
                    </div>
                    <Carousel srcs={u.image} />
                </div>


                {/* <Trade details={u} status={checkMyProduct()} /> */}
                <div className="notImg" style={detail.inner.notImg}>
                    {/* List of Details */}
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

                    {/* comments */}
                    <div stlye={{ display: "flex", flexDirection: "column", position: "relative" }}>
                        <div className="comments" style={{ marginBottom: "16px", paddingTop: "15px" }}>
                            <h5>Comments</h5>
                            <List
                                itemLayout="horizontal"
                                dataSource={comments}
                                renderItem={item => (
                                    <List.Item key={`${u.product_id}comment`}>
                                        <List.Item.Meta
                                            title={<h6>{item.title}</h6>}
                                            description={item.content}
                                        />
                                        {item.description}
                                    </List.Item>
                                )}
                            >
                            </List>
                            <input style={{ width: "220px", marginBottom: "20px", height: "42.74px" }} type="text" onChange={this.props.handleComment} value={this.props.comment} placeholder="Write a comment!" />
                            <button className="myCmBtn" onClick={() => { this.props.handleSubmitComment(u.product_id, this.props.comment, this.props.allUsers) }}>Submit Comment</button>
                        </div>
                    </div>
                </div>


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
                    const comments = ids.map(async (comment_id) => {
                        const sth = await Axios(`https://localhost:8443/api/comment/${comment_id}`, {
                            method: "get",
                            withCredentials: true
                        })
                        const comment = sth.data[0]
                        const user = allUsers.filter((u) => {
                            return u.user_id == comment.commentator
                        })[0].displayed_name
                        const day = Math.floor((new Date() - new Date(comment.comment_at)) / 86400000)
                        return {
                            title: user,
                            content: comment.comment,
                            description: `${day} days ago`
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

// const otherUser = this.props.allUsers
        //     .filter((u) => { return u.displayed_name == this.props.otherUser })
        //     .map((u) => {
        //         return (
        //             <div style={{ backgroundColor: "#f4fef4", borderRadius: "1vw", display: "flex", flexDirection: "column" }}>
        //                 <div className="userBanner" style={{ borderRadius: "1vw", backgroundColor: "#c1fcc1", height: "5vh", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
        //                     <p>this is a banner</p>
        //                 </div>
        //                 <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        //                     <img src={u.profile_picture} style={{ marginTop: "2vh", marginBottom: "2vh", width: "10vw", borderRadius: "50%" }} />
        //                     <h4 style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>{u.displayed_name}</h4>
        //                     <h4 style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>Credibility: {u.credibility}</h4>
        //                 </div>
        //             </div>
        //         )
        //     })