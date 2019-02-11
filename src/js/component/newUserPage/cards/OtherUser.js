import React, { Component } from "react"
import { connect } from "react-redux";

import TradeStyle from "../style/TradeCards"
import UploadStyle from "../style/Upload"

import actions_userPage from "../../../actions/userPage"
import actions_newUserPage from "../../../actions/newUserPage"
import actions_search from "../../../actions/search"
import actions_trade from "../../../actions/trade"
import { updateProducts } from '../../../actions/hello'

import Axios from "axios"
import { Button, Icon } from "antd"

const err = require('../../asset/gif/replaceNoImg.gif')

class OtherUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    stopPropagation = (e) => {
        e.stopPropagation()
    }

    render() {
        const {out} = this.props

        const user = this.props.allUsers.filter((u) => {
            return u.user_id == this.props.otherUser
        })[0]

        console.log (this.props.otherUser)
        console.log (user)

        const aItems = user.uploaded_products
            .map((u) => {
                return this.props.allProducts.filter((a) => {
                    return a.product_id == u
                })[0]
            })
            .filter((u) => {
                return u.status == 1
            })
            .map((u) => {
                return (
                    <div className="smallCard"
                        style={TradeStyle.a.smallCard}
                        key={`${u.product_id}_smallCard`}
                        onClick={() => { this.props.openTradeCards(u, "a") }}
                    >
                        <div className="img" style={TradeStyle.a.img}>
                            <img src={u.image[0] ? u.image[0] : err} alt=""
                                style={{ width: "7vw", height: "7vw", objectFit: "contain", boxShadow: "0.5vw 0.5vw 2vw rgb(100,100,100)" }} />
                        </div>
                        <div className="name" style={TradeStyle.a.name}>
                            <p
                                style={{ textAlign: "center", padding: 0, margin: 0, fontSize: "0.5vw" }}>
                                {u.name}
                            </p>
                        </div>
                    </div>
                )
            })

        
        return (
            <div className="tradeCards" style={out? TradeStyle.otherUser.out:TradeStyle.otherUser.bigframe} onClick={this.props.closeOtherUser}>
                <div className="content" style={TradeStyle.otherUser.content} onClick={this.stopPropagation}>

                    <div className="title" style={TradeStyle.inner.titleAConfirm}>
                        <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                            {user.displayed_name}'s Profile
                            </h3>
                    </div>
                    <div className="innerContent" style={TradeStyle.a.frame}>

                        <div className="aItems" style={TradeStyle.a.aItemsConfirm}>

                            <img src={user.profile_picture}
                                alt=""
                                style={{
                                    width: "16vw",
                                    height: "16vw",
                                    objectFit: "contain",
                                    boxShadow: "0.5vw 0.5vw 2vw rgb(100,100,100)"
                                }}
                            />

                            <p style={{ marginTop: "3vw" }}>Phone</p>
                            <h5>{user.phone_number}</h5>

                        </div>

                        <div className="aItems" style={TradeStyle.otherUser.drop}>

                            <div className="title" style={TradeStyle.otherUser.title}>
                                <h4>Available Products For Trade</h4>
                            </div>


                            <div className="aItems" style={TradeStyle.otherUser.aItems}>
                                {aItems}
                            </div>

                        </div>

                    </div>
                    <div className="buttons" style={TradeStyle.inner.buttons}>
                        <Button type="primary" onClick={this.props.closeOtherUser}>Return</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    const search = state.searchReducer
    return {
        otherUser: user.otherUser,
        allUsers: user.allUsers,
        allProducts: search.allProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeOtherUser: () => {
            dispatch(actions_userPage.closeOtherUser())
        },
        openTradeCards: (details, status) => {
            dispatch(actions_trade.openTradeCards(details, status))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUser)