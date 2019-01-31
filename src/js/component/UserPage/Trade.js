import React, { Component } from "react"
import { Button, Row, Col, Card } from "antd"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";
import { connect } from "react-redux"
import actions_trade from "../../actions/trade"
import actions_userPage from "../../actions/userPage"
import actions_search from "../../actions/search"
import MyGoodsCard from "./cards/MyGoodsCard"

import LoginForm from '../LoginForm'
// import RegistrationForm from "../RegistrationForm";
// import {handleLoginToggle} from '../../actions/hello'

const err = require('../asset/gif/error404.gif')

class Trade extends Component {

    // whats that man there is no state in Trade component

    // handleLoginToggle = () => {
    //     this.setState({ tryLogin: !this.state.tryLogin })
    // }

    handlePlaceOffer = async () => {
        const data = {
            product_offered: this.props.details.product_id,
            product_offering: this.props.selected
        }
        try {
            const res = await Axios("https://localhost:8443/api/offer_product", {
                method: 'post',
                data: data,
                withCredentials: true
            })

            // fetch allProducts
            const pres = await Axios.get('https://localhost:8443/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get('https://localhost:8443/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios('https://localhost:8443/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

            // finished trading
            this.props.clearSelect()

        } catch (err) {
            console.log(err)
        }
    }

    handleDeleteOffer = async (currentOfferID) => {
        const id = currentOfferID[0].product_id
        const data = {
            product_offered: this.props.details.product_id,
            product_offering: id
        }
        console.log(data)
        try {
            const res = await Axios("https://localhost:8443/api/offer_product", {
                method: 'delete',
                data: data,
                withCredentials: true
            })
            console.log(res)

            // fetch allProducts
            const pres = await Axios.get('https://localhost:8443/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get('https://localhost:8443/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios('https://localhost:8443/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

        } catch (err) {

        }
    }

    render() {
        const { status, details } = this.props

        const selectedCard = this.props.allProducts
            .filter((u) => {
                return u.product_id == this.props.selected
            })
            .map((u) => {
                return (
                    <Card
                        style={{ width: "7vw" }}
                        cover={
                            <img
                                alt={u.name}
                                src={u.image}
                            />
                        }
                        key={u.id}
                        id={u.id}
                    >
                        <Card.Meta
                            title={u.name}
                        />

                    </Card>
                )
            })

        const allCards = this.props.allProducts
            .filter((u) => {
                return u.uploaded_by == this.props.myUser.user_id && u.status == 1
            })
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <MyGoodsCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            tags={u.tags}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            trade={true}
                            handleSelect={this.props.handleSelect}
                        />
                    </Col>
                )
            })

        const openOGModal = this.props.allProducts.filter((u) => {
            return u.product_id == details.product_id
        })[0].openOGModal

        const openDELModal = this.props.allProducts.filter((u) => {
            return u.product_id == details.product_id
        })[0].openDELModal

        const currentOfferID = this.props.allProducts
            .filter((u) => {
                const id = details.offered_by.find((offer) => {
                    return this.props.myUser.uploaded_products.some((a) => {
                        return a == offer
                    })
                })
                return u.product_id == id
            })

        console.log(currentOfferID)

        const currentOffer = currentOfferID
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <MyGoodsCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            tags={u.tags}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            trade={true}
                            handleSelect={this.props.handleSelect}
                        />
                    </Col>
                )
            })

        switch (status) {
            case "myP":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button style={{ marginBottom: "1vw" }} ghost type="primary">Check Received Offer</Button>
                    </div>
                )
            case "na":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button style={{ marginBottom: "1vw" }} ghost type="dashed">Not Available</Button>
                    </div>
                )
            case "offered":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button onClick={() => { this.props.openDELModal(details.product_id) }} style={{ marginBottom: "1vw" }} ghost type="primary">Rollback Offer</Button>
                        {openDELModal &&
                            <Popup open={true} closeOnDocumentClick onClose={() => { this.props.openDELModal(details.product_id) }}>
                                <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", width: "50vw", height: "50vh" }}>
                                    <a style={popUpCloseTag} onClick={() => { this.props.openDELModal(details.product_id) }}>&times;</a>
                                    <div style={{ width: "50vw", height: '50vh', display: "flex" }}>
                                        <Row>
                                            <Col span={12}>
                                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                                    <p>Your Current Offer</p>
                                                    {currentOffer}
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <Button type="danger" onClick={() => { this.handleDeleteOffer(currentOfferID) }}>Confirm Rollback Offer</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Popup>}
                    </div>
                )
            case "otherP":
                return (
                    <div className="trade" style={{textAlign:"center"}}>
    
                        <Button onClick={() => { this.props.openOGModal(details.product_id) }} style={{ marginTop:"40px"}} className="myLgBtn">Make an Offer</Button>
                        {openOGModal &&
                            <Popup  open={true} closeOnDocumentClick onClose={() => { this.props.openOGModal(details.product_id) }}>
                                <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", width: "50vw", height: "50vh" }}>
                                    <a style={popUpCloseTag} onClick={() => { this.props.openOGModal(details.product_id) }}>&times;</a>
                                    <h1>Trading Panel</h1>
                                    <Row>

                                        <Col span={16}>
                                            <div style={{ overflowY: "scroll" }}>
                                                {allCards}
                                            </div>
                                        </Col>

                                        <Col span={8}>
                                            <div className="tradeBox" style={{ display: "flex", flexDirection: "column" }}>
                                                {this.props.selected &&
                                                    <div className="selectedCard">
                                                        {selectedCard}
                                                    </div>}
                                                {!this.props.selected &&
                                                    <div className="selectedCard" style={{
                                                        width: "7vw", height: "7vw", backgroundColor: "yellow",
                                                        display: "flex", justifyContent: "center", alignItems: "center"
                                                    }}>
                                                        <p style={{ color: "red" }}>Select a product from Left Panel</p>
                                                    </div>}
                                                <div className="confirmTrade">
                                                    <Button onClick={this.handlePlaceOffer} type="danger">Confirm Placing Offer</Button>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>

                                </div>
                            </Popup>}
                    </div>
                )
            default:
                return (
                    <div className="trade" style={{ marginTop: "50px",textAlign: "center"}}>
                        {this.props.tryLogin && <LoginForm handleLogin={this.props.handleLoginToggle} />}
                        <Button  onClick={this.props.handleLoginToggle} className="myLgBtn">Login to make a deal!</Button>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    const trade = state.tradeReducer
    const search = state.searchReducer
    const rooot = state.roootReducer
    return {
        myUser: user.myUser,
        openMyGoodModal: trade.openMyGoodModal,
        openOGModal: trade.openOGModal,
        selected: trade.selected,
        allProducts: search.allProducts,
        tryLogin: rooot.tryLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openMyGoodModal: () => {
            dispatch(actions_trade.openMyGoodModal())
        },
        openOGModal: (id) => {
            dispatch(actions_trade.openOGModal(id))
        },
        openDELModal: (id) => {
            dispatch(actions_trade.openDELModal(id))
        },
        handleSelect: (id) => {
            dispatch(actions_trade.selectMyGood(id))
        },
        clearSelect: () => {
            dispatch(actions_trade.clearSelect())
        },
        storeAllProducts: (products) => {
            dispatch(actions_search.storeAllProducts(products))
        },
        storeAllUsers: (allUsers) => {
            dispatch(actions_userPage.storeAllUsers(allUsers))
        },
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        },
        // handleLoginToggle: a=> dispatch(handleLoginToggle(a)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)