import React, { Component } from "react"
import { Button, Row, Col, Card } from "antd"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../../compCSS/popupCss'
import Axios from "axios";
import { connect } from "react-redux"
import actions_trade from "../../../actions/trade"
import actions_userPage from "../../../actions/userPage"
import actions_search from "../../../actions/search"

import LoginForm from '../../LoginForm'
// import RegistrationForm from "../RegistrationForm";
// import {handleLoginToggle} from '../../actions/hello'

const err = require('../../asset/gif/error404.gif')

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
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                method: 'post',
                data: data,
                withCredentials: true
            })

            // fetch allProducts
            const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
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

    handleAcceptOffer = async () => {
        const data = {
            product_offered: this.props.details.product_id,
            product_offering: this.props.selected
        }
        console.log(data)
        try {
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/acceptOffer/", {
                method: 'post',
                data: data,
                withCredentials: true
            })

            console.log(res)

            // fetch allProducts
            const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
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
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                method: 'delete',
                data: data,
                withCredentials: true
            })
            console.log(res)

            // fetch allProducts
            const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { status, details, myUser } = this.props
        const id = myUser.user_id
        switch (status) {
            // now there are 6 status

            // nth: my things but have no offer
            // withR: my things with offer(s)
            // trading: my things locked in trade
            // traded: my things traded 

            // na: other things locked or traded
            // a: other things open for trade
            case "nth":
                return (
                    <div className="trade">
                        <Button ghost type="primary">No Offers</Button>
                    </div>
                )
            case "traded":
                return (
                    <div className="trade">
                        <Button ghost type="dashed">Traded</Button>
                    </div>
                )
            case "requested":
            case "trading":
                return (
                    <div className="trade">
                        <Button ghost type="primary" onClick={() => { this.props.openTradeCards(details, status, id) }}>Rollback Offer</Button>
                    </div>
                )
            case "withR":
                return (
                    <div className="trade">
                        <Button ghost type="primary" onClick={() => { this.props.openTradeCards(details, status, id) }}>Check Received Offers</Button>

                    </div>
                )
            case "a":
                return (
                    <div className="trade">
                        <Button ghost type="primary" onClick={() => { this.props.openTradeCards(details, status, id) }}>Make An Offer</Button>
                    </div>
                )
            case "na":
                return (
                    <div className="trade">
                        <Button ghost type="primary">Not available</Button>
                    </div>
                )
            default:
                return (
                    <div className="trade" style={{ marginTop: "50px", textAlign: "center" }}>
                        {this.props.tryLogin && <LoginForm handleLogin={this.props.handleLoginToggle} />}
                        <Button onClick={this.props.handleLoginToggle} className="myLgBtn">Login to make a deal!</Button>
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
        openMyGoodModal: (id) => {
            dispatch(actions_trade.openMyGoodModal(id))
            dispatch(actions_trade.clearSelect())
        },
        openOGModal: (id) => {
            dispatch(actions_trade.openOGModal(id))
            dispatch(actions_trade.clearSelect())
        },
        openDELModal: (id) => {
            dispatch(actions_trade.openDELModal(id))
            dispatch(actions_trade.clearSelect())
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
        openTradeCards: (details, status, id) => {
                dispatch(actions_search.setMyProducts(id))
                dispatch(actions_trade.openTradeCards(details, status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)