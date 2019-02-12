import React, { Component } from "react"
import { List, Row, Col, Button } from "antd"
import actions_userPage from "../../../actions/userPage";
import actions_search from '../../../actions/search'
import { connect } from "react-redux"
import Axios from "axios";
// import Trade from "./Trade"
import BigCardsStyle from "../style/BigCards"
import { updateProducts } from '../../../actions/hello'
import GeneralTags from "../../AddPhotos/tags_antd"

import Trade from "./Trade"
import Carousel from "./Carousel"

const err = require('../../asset/gif/replaceNoImg.gif')

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: true,
            comments: false
        }
    }

    openDetails = () => {
        this.setState({
            details: true,
            comments: false
        })
    }

    openComments = () => {
        this.setState({
            details: false,
            comments: true
        })
    }

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

        const fullDate = () => {
            const date = new Date(u.uploaded_at)
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate()
            }
        }

        const tradestatus = () => {
            if (u.status == 1) {
                return "Available"
            } else if (u.status == 2) {
                return "trading"
            } else if (u.status == 3) {
                return "traded"
            }
        }

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
                description: `${fullDate().year}-${fullDate().month}-${fullDate().date}`
            },
            {
                title: "Status of Trade",
                description: tradestatus()
            },
            
        ]

        const detail = BigCardsStyle.details
        return (
            <div className="detailOuter" key={`details-${u.product_id}`} style={detail.outer}>

                {/* image */}
                <div style={detail.inner.img} className="imageCarousel">
                    <div className="header"
                        style={detail.inner.imgHeader}>
                        <h4 style={{ padding: 0, margin: 0 }}>{u.name}</h4>
                        <Trade details={u} status={status} />
                    </div>
                    <Carousel srcs={u.image} />
                </div>


                {/* <Trade details={u} status={checkMyProduct()} /> */}
                <div className="notImg" style={detail.inner.notImg}>
                    <div className="buttons" style={detail.inner.button}>
                        <Button type="danger" onClick={this.openDetails} style={{ width: "15vw" }}>Details</Button>
                        {this.props.myUser.user_id &&
                            <Button type="danger" onClick={this.openComments} style={{ width: "15vw" }}>Comments</Button>}
                    </div>
                    {/* List of Details */}
                    {this.state.details &&
                        <div className="detailsList" style={detail.inner.notButton}>
                            <List
                                itemLayout="vertical"
                                dataSource={details}
                                renderItem={item => (
                                    <List.Item key={`list-${u.product_id}`}>
                                        {(item.title != "Owner" && item.title != "Tags") &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                            />}
                                        {(item.title == "Owner" && u.uploaded_by !== this.props.myUser.user_id) &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                                onClick={() => { this.props.handleOtherUser(u.uploaded_by) }}
                                            />}
                                        {(item.title == "Owner" && u.uploaded_by === this.props.myUser.user_id) &&
                                            <List.Item.Meta
                                            className="username"
                                                title={<h5>{item.title}</h5>}
                                                description={item.description}
                                            />}
                                        {item.title == "Tags" &&
                                            <List.Item.Meta
                                                title={<h5>{item.title}</h5>}>
                                                
                                            </List.Item.Meta>}
                                    </List.Item>
                                )}
                            >
                            </List>
                            <h5 style={{color: "rgb(100,100,100)"}}>Tags</h5>
                            <GeneralTags tags={this.props.details.tags} closable={false} />
                        </div>}

                    {/* comments */}
                    {(this.state.comments && this.props.myUser.user_id) &&
                        <div className="detailsList" stlye={{ display: "flex", flexDirection: "column", position: "relative" }} style={detail.inner.notButton}>
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
                        </div>}

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
        loading: ()=>{
            dispatch(actions_userPage.loading())
        },
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
                dispatch(actions_userPage.loading())
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
                        const sth = await Axios(`${process.env.REACT_APP_BACKEND_URL}/api/comment/${comment_id}`, {
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
                            dispatch(actions_userPage.loading())
                        })
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)