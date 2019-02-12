import React, { Component } from "react"
import { connect } from "react-redux"
import TradeStyle from "../style/TradeCards"
import actions_trade from "../../../actions/trade"
import actions_search from "../../../actions/search"
import actions_userPage from "../../../actions/userPage"
import actions_newUserPage from "../../../actions/newUserPage"
import { Button, Icon } from "antd"
import Axios from "axios"
import { updateProducts } from '../../../actions/hello'

const err = require('../../asset/gif/replaceNoImg.gif')

class TradeCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            a: null,
            aConfirm: false,
            swap: false,
            delete: false,
            swapDone: false,
            myRequestedProduct: null,
            accepted: false,
            original: null,
        }
    }

    // ===============general=====================

    componentDidMount = () => {
        this.props.setMyProducts(this.props.myUser.user_id)
    }

    stopPropagation = (e) => {
        e.stopPropagation()
    }

    closeTradeCards = (id) => {
        this.setState({
            a: null,
            aConfirm: false,
            swap: false,
            delete: false,
            swapDone: false,
            myRequestedProduct: null,
            accepted: false,
            original: null,
        })
        this.props.closeTradeCards(id)
    }

    // START===========functions for status "a"===================

    onAClick = (e, product) => {
        e.preventDefault()
        this.props.setMyProducts(this.props.myUser.user_id)
        this.setState({
            a: product
        })
        this.props.filterMyProducts(product.product_id)
    }

    handlePlaceOffer = async (myID) => {
        const data = {
            product_offered: this.props.currentTrade.details.product_id,
            product_offering: myID
        }

        const receivedOffer = this.state.a.offered_by

        try {
            this.props.loading()
            // decline all offers you received
            for (let fail of receivedOffer) {
                const rollbackData = {
                    product_offered: myID,
                    product_offering: fail
                }
                const rollback = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/decline_offer", {
                    method: 'delete',
                    data: rollbackData,
                    withCredentials: true
                })
            }

            // follow the product you made offer
            const liked = this.props.currentTrade.details.liked_by.some((u)=>{
                return u == this.props.myUser.user_id
            })
            if (!liked){
                const like = await Axios(`${process.env.REACT_APP_BACKEND_URL}/api/like/${this.props.currentTrade.details.product_id}`, {
                    method: "put",
                    withCredentials: true
                })
            }

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
            this.props.updateProducts(pres.data)
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
            this.setState({
                aConfirm: true
            })
            this.props.loading()
        } catch (err) {
            console.log(err)
        }
    }

    handleAConfirm = async () => {
        this.props.loading()
        // fetch allProducts
        const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
        pres.data.forEach((u) => {
            u.openOneModal = false
            u.openOGModal = false
            u.openMyGoodModal = false
            u.openDELModal = false
        })
        this.props.storeAllProducts(pres.data)
        this.props.updateProducts(pres.data)
        // fetch allUsers
        const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
        this.props.storeAllUsers(users.data)

        // fetch myUser
        const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
            method: "get",
            withCredentials: true
        })
        this.props.storeMyUser(user.data)

        // restore original state
        this.setState({
            a: null,
            aConfirm: false,
            swap: false,
            delete: false,
            swapDone: false,
            myRequestedProduct: null,
            accepted: false,
            original: null,
        })
        this.props.loading()
        // close the window
        this.props.closeAllCards(this.props.myUser.user_id)
    }

    // END===========end of functions for status "a"===================

    // START================funtcions for status "requested"======================

    handleOpenSwap = () => {
        this.setState({
            swap: true,
        })
    }

    handleMyOpenSwap = (p) => {
        this.setState({
            swap: true,
            myRequestedProduct: p
        })
    }

    handleShit = async (myProductID) => {
        if (this.state.a == null) {
            alert("Select a product first")
        } else {
            const data = {
                product_offered: this.props.currentTrade.details.product_id,
                product_offering: myProductID
            }
            const newData = {
                product_offered: this.props.currentTrade.details.product_id,
                product_offering: this.state.a.product_id
            }
            try {
                this.props.loading()
                const del = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                    method: 'delete',
                    data: data,
                    withCredentials: true
                })
                const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                    method: 'post',
                    data: newData,
                    withCredentials: true
                })
                this.setState({
                    swap: false,
                    swapDone: true
                })
                const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
                pres.data.forEach((u) => {
                    u.openOneModal = false
                    u.openOGModal = false
                    u.openMyGoodModal = false
                    u.openDELModal = false
                })
                this.props.storeAllProducts(pres.data)
                this.props.updateProducts(pres.data)
                // fetch allUsers
                const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
                this.props.storeAllUsers(users.data)

                // fetch myUser
                const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                    method: "get",
                    withCredentials: true
                })
                this.props.storeMyUser(user.data)
                this.props.loading()
            } catch (err) {
                console.log(err)
            }
        }
    }

    handleMyShit = async (myRequestedProductID) => {
        if (this.state.a == null) {
            alert("Select a product first")
        } else {
            const data = {
                product_offered: myRequestedProductID,
                product_offering: this.props.currentTrade.details.product_id,
            }
            const newData = {
                product_offered: myRequestedProductID,
                product_offering: this.state.a.product_id,
            }
            try {
                this.props.loading()
                const del = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                    method: 'delete',
                    data: data,
                    withCredentials: true
                })
                const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                    method: 'post',
                    data: newData,
                    withCredentials: true
                })

                const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
                pres.data.forEach((u) => {
                    u.openOneModal = false
                    u.openOGModal = false
                    u.openMyGoodModal = false
                    u.openDELModal = false
                })
                this.props.storeAllProducts(pres.data)
                this.props.updateProducts(pres.data)
                // fetch allUsers
                const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
                this.props.storeAllUsers(users.data)

                // fetch myUser
                const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                    method: "get",
                    withCredentials: true
                })
                this.props.storeMyUser(user.data)
                this.props.loading()
                this.setState({
                    swap: false,
                    swapDone: true
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    handleDeleteOffer = async (myProductID) => {
        const id = myProductID
        const data = {
            product_offered: this.props.currentTrade.details.product_id,
            product_offering: id
        }
        try {
            
            this.props.loading()
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                method: 'delete',
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
            this.props.updateProducts(pres.data)
            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

            // set delete state
            this.setState({
                delete: true
            })

            this.props.loading()
        } catch (err) {
            console.log(err)
        }
    }

    handleMyDeleteOffer = async (myRequestedProductID) => {
        const data = {
            product_offered: myRequestedProductID,
            product_offering: this.props.currentTrade.details.product_id,
        }
        try {
            
            this.props.loading()
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/offer_product", {
                method: 'delete',
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
            this.props.updateProducts(pres.data)
            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)

            // set delete state
            this.setState({
                delete: true
            })

            this.props.loading()
        } catch (err) {
            console.log(err)
        }
    }

    handleSwap = () => {
        this.setState({
            swap: true
        })
    }

    // END==================end of functions for status "requested"==================

    // START===================functions for status "withR"======================

    handleWithR = async () => {
        const selectedID = this.state.a.product_id
        // suspected : filter is not needed
        // you needa
        const notSelected = this.props.currentTrade.details.offered_by
            .filter((u) => {
                return u != selectedID
            })
        const myID = this.props.currentTrade.details.product_id
        const accept = {
            product_offered: myID,
            product_offering: selectedID
        }
        this.setState({
            original: this.props.currentTrade.details
        })
        try {

            this.props.loading()
            for (let fail of notSelected) {
                const rollbackData = {
                    product_offered: myID,
                    product_offering: fail
                }
                const rollback = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/decline_offer", {
                    method: 'delete',
                    data: rollbackData,
                    withCredentials: true
                })
            }

            // accept offer
            const res = await Axios(process.env.REACT_APP_BACKEND_URL + "/api/acceptOffer/", {
                method: 'post',
                data: accept,
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
            this.props.updateProducts(pres.data)
            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)
            // console.log (user.data.trade_history)
            // let arr = []
            // for (let h of user.data.trade_history) {
            //     console.log (h)
            //     const raw = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/history', {
            //         method: "get",
            //         data: h,
            //         withCredentials: true
            //     })
            //     console.log (raw.data)
            //     arr.push(raw.data)
            // }
            // this.props.setTradeHistory(arr)

            this.props.setMyProducts(this.props.myUser.user_id)

            this.props.setFProducts(this.props.myUser.user_id)

            this.props.loading()
            this.setState({
                accepted: true
            })

        } catch (err) {

        }
    }

    // END=================end of functions for status "withR"=====================

    render() {
        const { out } = this.props
        const { status, details } = this.props.currentTrade

        // =========== RENDER for status "a" ===================
        const aItems = this.props.myProducts.length > 0 ?
            this.props.myProducts
                .filter((u) => { return u.status == 1 })
                .map((u) => {
                    return (
                        <div className="smallCard"
                            style={TradeStyle.a.smallCard}
                            key={`${u.product_id}_smallCard`}
                            onClick={(e) => this.onAClick(e, u)}
                        >
                            <div className="img" style={TradeStyle.a.img}>
                                <img src={u.image[0] ? u.image[0] : err} alt=""
                                    style={{ width: "7vw", height: "7vw", objectFit: "contain" }} />
                            </div>
                            <div className="name" style={TradeStyle.a.name}>
                                <p
                                    style={{ textAlign: "center", padding: 0, margin: 0, fontSize: "0.5vw" }}>
                                    {u.name}
                                </p>
                            </div>
                        </div>
                    )
                }) : () => {
                    return (
                        <div>
                            <p style={{ textAlign: "center" }}>You have no available goods for exchange</p>
                            <Button onClick={() => { this.props.handleNav("Upload") }} type="primary">Click to upload new goods</Button>
                        </div>
                    )
                }

        // ============= RENDER for status "requested" and "trading" =====================
        const myProductsID = this.props.myProducts.map((u) => {
            return u.product_id
        })

        const mySentProductID = details.offered_by.filter((u) => {
            return myProductsID.some((a) => {
                return a == u
            })
        })[0]

        const mySentProduct = this.props.myProducts.filter((u) => {
            return u.product_id == mySentProductID
        })[0]

        const myRequestedProduct = this.props.allProducts
            .filter((u) => {
                return u.offered_by.some((a) => {
                    return a == details.product_id
                })
            })[0]

        // ============= RENDER for status "withR" ====================
        const withRItems = this.props.allProducts.filter((u) => {
            return details.offered_by.some((a) => {
                return u.product_id == a
            })
        })
            .map((u) => {
                return (
                    <div className="smallCard"
                        style={TradeStyle.a.smallCard}
                        key={`${u.product_id}_smallCard`}
                        onClick={(e) => this.onAClick(e, u)}
                    >
                        <div className="img" style={TradeStyle.a.img}>
                            <img src={u.image[0] ? u.image[0] : err} alt=""
                                style={{ width: "7vw", height: "7vw", objectFit: "contain" }} />
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

        switch (status) {
            case "requested":
                // use mySentProduct
                return (
                    <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                        <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                            {!this.state.swapDone &&
                                <div className="title" style={TradeStyle.inner.titleRequestedConfirm}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Rollback Request
                                    </h3>
                                </div>}
                            {this.state.swapDone &&
                                <div className="title" style={TradeStyle.inner.titleSwapDone}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Finished Swapping!
                                    </h3>
                                </div>}
                            <div className="innerContent" style={TradeStyle.a.frame}>

                                {(!this.state.swap && !this.state.swapDone) &&
                                    <div className="aItems" style={TradeStyle.a.aItemsConfirm}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Your Own Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={mySentProduct.image[0] ? mySentProduct.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{mySentProduct.name}</p>
                                            </div>
                                        </div>
                                        {!this.state.delete &&
                                            <div className="buttons" style={TradeStyle.swap.swapButton}>
                                                <Button type="danger" onClick={this.handleOpenSwap}>Swap another product</Button>
                                                <Button type="danger" onClick={() => { this.handleDeleteOffer(mySentProductID) }}>Delete Request</Button>
                                            </div>}
                                    </div>}

                                {this.state.swapDone &&
                                    <div className="aItems" style={TradeStyle.a.aItemsConfirm}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>New Product for exchange</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                            </div>
                                        </div>
                                    </div>}

                                {this.state.swap &&
                                    <div className="aItems" style={TradeStyle.swap.frame}>
                                        <div className="swapZone1" style={TradeStyle.swap.swapzone1}>
                                            <div className="title" style={{ marginBottom: "1.5vw" }}>
                                                <h5>Original Product</h5>
                                            </div>
                                            <div className="middleCard" style={TradeStyle.swap.middleCard}>
                                                <div className="img" style={TradeStyle.a.img}>
                                                    <img src={mySentProduct.image[0] ? mySentProduct.image[0] : err}
                                                        alt=""
                                                        style={{ width: "10vw", height: "10vw", objectFit: "contain" }}
                                                    />
                                                </div>
                                                <div className="middleName" style={TradeStyle.swap.middlename}>
                                                    <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{mySentProduct.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swapLogo" style={TradeStyle.swap.swapLogo}>
                                            <Icon type="swap" />
                                        </div>

                                        {this.state.a != null && <div className="swapZone2" style={TradeStyle.swap.swapzone2}>
                                            <div className="title" style={{ marginBottom: "1.5vw" }}>
                                                <h5>New Product</h5>
                                            </div>
                                            <div className="middleCard" style={TradeStyle.swap.middleCard}>
                                                <div className="img" style={TradeStyle.a.img}>
                                                    <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                        alt=""
                                                        style={{ width: "10vw", height: "10vw", objectFit: "contain" }}
                                                    />
                                                </div>
                                                <div className="middleName" style={TradeStyle.swap.middlename}>
                                                    <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                                </div>
                                            </div>
                                        </div>}

                                        {this.state.a == null && <div className="swapZone2" style={TradeStyle.swap.swapzone2}>
                                            <div className="title">
                                                <h5>Select a new product from below</h5>
                                            </div>
                                        </div>}

                                        <div className="choose" style={TradeStyle.swap.choose}>
                                            {aItems}
                                        </div>

                                    </div>}

                                <div className="arrow" style={TradeStyle.a.arrow}>
                                    <Icon type="arrow-right" />
                                </div>

                                {!this.state.delete && <div className="select" style={TradeStyle.a.drop}>
                                    <div className="title" style={{ marginBottom: "3vw" }}>
                                        <h4>Your Requested Product</h4>
                                    </div>
                                    <div className="middleCard" style={TradeStyle.a.middleCard}>
                                        <div className="img" style={TradeStyle.a.img}>
                                            <img src={details.image[0] ? details.image[0] : err}
                                                alt=""
                                                style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                            />
                                        </div>
                                        <div className="middleName" style={TradeStyle.a.middlename}>
                                            <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{details.name}</p>
                                        </div>
                                    </div>
                                </div>}
                                {this.state.delete && <div className="select" style={TradeStyle.a.drop}>
                                    <div className="title">
                                        <h4>Your Requested of exchange is deleted.</h4>
                                    </div>
                                </div>}

                            </div>

                            {((!this.state.swap && !this.state.delete) && !this.state.swapDone) &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="danger" onClick={() => { this.handleDeleteOffer(mySentProductID) }}>Delete Request</Button>
                                    <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                                </div>}

                            {(this.state.delete || this.state.swapDone) &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="primary" onClick={this.handleAConfirm}>Return</Button>
                                </div>}

                            {this.state.swap &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="danger" onClick={() => { this.handleShit(mySentProductID) }}>Confirm Swap</Button>
                                    <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                                </div>}

                        </div>
                    </div>
                )
            case "trading":
                // use myRequestedProduct
                // myRequestedProduct: the product of other ppl
                // details: my own product
                return (
                    <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                        <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                            {!this.state.swapDone &&
                                <div className="title" style={TradeStyle.inner.titleRequestedConfirm}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Rollback Request
                                    </h3>
                                </div>}
                            {this.state.swapDone &&
                                <div className="title" style={TradeStyle.inner.titleSwapDone}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Finished Swapping!
                                    </h3>
                                </div>}
                            <div className="innerContent" style={TradeStyle.a.frame}>

                                {(!this.state.swap && !this.state.swapDone) &&
                                    <div className="aItems" style={TradeStyle.a.aItemsConfirm}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Your Own Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={details.image[0] ? details.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{details.name}</p>
                                            </div>
                                        </div>
                                        {!this.state.delete &&
                                            <div className="buttons" style={TradeStyle.swap.swapButton}>
                                                <Button type="danger" onClick={() => { this.handleMyOpenSwap(myRequestedProduct) }}>Swap another product</Button>
                                                <Button type="danger" onClick={() => { this.handleMyDeleteOffer(myRequestedProduct.product_id) }}>Delete Request</Button>
                                            </div>}
                                    </div>}

                                {this.state.swapDone &&
                                    <div className="aItems" style={TradeStyle.a.aItemsConfirm}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>New Product for exchange</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                            </div>
                                        </div>
                                    </div>}

                                {this.state.swap &&
                                    <div className="aItems" style={TradeStyle.swap.frame}>
                                        <div className="swapZone1" style={TradeStyle.swap.swapzone1}>
                                            <div className="title" style={{ marginBottom: "1.5vw" }}>
                                                <h5>Original Product</h5>
                                            </div>
                                            <div className="middleCard" style={TradeStyle.swap.middleCard}>
                                                <div className="img" style={TradeStyle.a.img}>
                                                    <img src={details.image[0] ? details.image[0] : err}
                                                        alt=""
                                                        style={{ width: "10vw", height: "10vw", objectFit: "contain" }}
                                                    />
                                                </div>
                                                <div className="middleName" style={TradeStyle.swap.middlename}>
                                                    <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{details.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="swapLogo" style={TradeStyle.swap.swapLogo}>
                                            <Icon type="swap" />
                                        </div>

                                        {this.state.a != null && <div className="swapZone2" style={TradeStyle.swap.swapzone2}>
                                            <div className="title" style={{ marginBottom: "1.5vw" }}>
                                                <h5>New Product</h5>
                                            </div>
                                            <div className="middleCard" style={TradeStyle.swap.middleCard}>
                                                <div className="img" style={TradeStyle.a.img}>
                                                    <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                        alt=""
                                                        style={{ width: "10vw", height: "10vw", objectFit: "contain" }}
                                                    />
                                                </div>
                                                <div className="middleName" style={TradeStyle.swap.middlename}>
                                                    <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                                </div>
                                            </div>
                                        </div>}

                                        {this.state.a == null && <div className="swapZone2" style={TradeStyle.swap.swapzone2}>
                                            <div className="title">
                                                <h5>Select a new product from below</h5>
                                            </div>
                                        </div>}

                                        <div className="choose" style={TradeStyle.swap.choose}>
                                            {aItems}
                                        </div>

                                    </div>}

                                <div className="arrow" style={TradeStyle.a.arrow}>
                                    <Icon type="arrow-right" />
                                </div>

                                {(!this.state.delete && myRequestedProduct) && <div className="select" style={TradeStyle.a.drop}>
                                    <div className="title" style={{ marginBottom: "3vw" }}>
                                        <h4>Your Requested Product</h4>
                                    </div>
                                    <div className="middleCard" style={TradeStyle.a.middleCard}>
                                        <div className="img" style={TradeStyle.a.img}>
                                            <img src={myRequestedProduct.image[0] ? myRequestedProduct.image[0] : err}
                                                alt=""
                                                style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                            />
                                        </div>
                                        <div className="middleName" style={TradeStyle.a.middlename}>
                                            <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{myRequestedProduct.name}</p>
                                        </div>
                                    </div>
                                </div>}
                                {((!this.state.delete && !myRequestedProduct) && this.state.myRequestedProduct) && <div className="select" style={TradeStyle.a.drop}>
                                    <div className="title" style={{ marginBottom: "3vw" }}>
                                        <h4>Your Requested Product</h4>
                                    </div>
                                    <div className="middleCard" style={TradeStyle.a.middleCard}>
                                        <div className="img" style={TradeStyle.a.img}>
                                            <img src={this.state.myRequestedProduct.image[0] ? this.state.myRequestedProduct.image[0] : err}
                                                alt=""
                                                style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                            />
                                        </div>
                                        <div className="middleName" style={TradeStyle.a.middlename}>
                                            <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.myRequestedProduct.name}</p>
                                        </div>
                                    </div>
                                </div>}
                                {this.state.delete && <div className="select" style={TradeStyle.a.drop}>
                                    <div className="title">
                                        <h4>Your Requested of exchange is deleted.</h4>
                                    </div>
                                </div>}

                            </div>

                            {((!this.state.swap && !this.state.delete) && !this.state.swapDone) &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="danger" onClick={() => { this.handleMyDeleteOffer(myRequestedProduct.product_id) }}>Delete Request</Button>
                                    <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                                </div>}

                            {(this.state.delete || this.state.swapDone) &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="primary" onClick={this.handleAConfirm}>Return</Button>
                                </div>}

                            {this.state.swap &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="danger" onClick={() => { this.handleMyShit(myRequestedProduct.product_id) }}>Confirm Swap</Button>
                                    <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                                </div>}

                        </div>
                    </div>
                )
            case "withR":
                return (
                    <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                        <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                            {!this.state.accepted && <div className="title" style={TradeStyle.inner.titleWithRConfirm}>
                                <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                    Received Requests
                                </h3>
                            </div>}
                            {this.state.accepted && <div className="title" style={TradeStyle.inner.titleWithRConfirm}>
                                <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                    Exchange Completed
                                </h3>
                            </div>}
                            <div className="innerContent" style={TradeStyle.a.frame}>

                                {/* <div className="arrow" style={TradeStyle.withR.arrow}>
                                    <Icon type="swap" />
                                </div> */}

                                {!this.state.accepted &&
                                    <div className="aItems" style={TradeStyle.withR.frame}>

                                        <div className="items" style={TradeStyle.withR.items}>
                                            <div className="itemsTitle" style={TradeStyle.withR.itemsTitle}>
                                                <h6>Products for Exchange</h6>
                                            </div>
                                            <div className="itemsContent" style={TradeStyle.withR.itemsContent}>
                                                {withRItems}
                                            </div>
                                        </div>

                                        {this.state.a != null &&
                                            <div className="choosed" style={TradeStyle.withR.choosed}>
                                                <div className="middleCard" style={TradeStyle.a.middleCard}>
                                                    <div className="img" style={TradeStyle.a.img}>
                                                        <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                            alt=""
                                                            style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                        />
                                                    </div>
                                                    <div className="middleName" style={TradeStyle.a.middlename}>
                                                        <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                                    </div>
                                                </div>
                                            </div>}
                                        {this.state.a == null &&
                                            <div className="choosed" style={TradeStyle.withR.choosed}>
                                                <h5>Choose a product for exchange</h5>
                                            </div>}
                                    </div>}

                                {!this.state.accepted &&
                                    <div className="select" style={TradeStyle.a.drop}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Your Own Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={details.image[0] ? details.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{details.name}</p>
                                            </div>
                                        </div>
                                    </div>}



                                {this.state.accepted &&
                                    <div className="aItems" style={TradeStyle.withR.accepted}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Your Original Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={this.state.original.image[0] ? this.state.original.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.original.name}</p>
                                            </div>
                                        </div>
                                    </div>}

                                {this.state.accepted &&
                                    <div className="select" style={TradeStyle.a.drop}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Received Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                            </div>
                                        </div>
                                    </div>}

                            </div>

                            {!this.state.accepted &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    {this.state.a && <Button type="danger" onClick={this.handleWithR}>Confirm Trade</Button>}
                                    <Button type="primary" onClick={this.handleAConfirm}>Return</Button>
                                </div>}
                            {this.state.accepted &&
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="primary" onClick={this.handleAConfirm}>Return</Button>
                                </div>}
                        </div>
                    </div>
                )
            case "a":
                if (!this.state.aConfirm) {
                    return (
                        <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                            <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                                <div className="title" style={TradeStyle.inner.title}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Make an Offer
                                </h3>
                                </div>
                                <div className="innerContent" style={TradeStyle.a.frame}>
                                    <div className="aItems" style={TradeStyle.a.aItems}>
                                        {aItems}
                                    </div>
                                    {this.state.a == null &&
                                        <div className="select" style={TradeStyle.a.drop}>
                                            <h4>Select Your Product from Left Panel for exchange</h4>
                                        </div>}
                                    {this.state.a != null &&
                                        <div className="select" style={TradeStyle.a.drop}>
                                            <div className="title" style={{ marginBottom: "3vw" }}>
                                                <h4>Product to be Exchanged</h4>
                                            </div>
                                            <div className="middleCard" style={TradeStyle.a.middleCard}>
                                                <div className="img" style={TradeStyle.a.img}>
                                                    <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                        alt=""
                                                        style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                    />
                                                </div>
                                                <div className="middleName" style={TradeStyle.a.middlename}>
                                                    <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }


                                </div>
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    {this.state.a != null &&
                                        <Button type="danger" onClick={() => { this.handlePlaceOffer(this.state.a.product_id) }}>Confirm</Button>}
                                    <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                            <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                                <div className="title" style={TradeStyle.inner.titleAConfirm}>
                                    <h3 style={{ paddingBottom: 0, paddingLeft: "1vw", margin: 0, textAlign: "center" }}>
                                        Trade Request Confirmed
                                    </h3>
                                </div>
                                <div className="innerContent" style={TradeStyle.a.frame}>

                                    <div className="aItems" style={TradeStyle.a.aItemsConfirm}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Your Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={this.state.a.image[0] ? this.state.a.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{this.state.a.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrow" style={TradeStyle.a.arrow}>
                                        <Icon type="arrow-right" />
                                    </div>

                                    <div className="select" style={TradeStyle.a.drop}>
                                        <div className="title" style={{ marginBottom: "3vw" }}>
                                            <h4>Requested Product</h4>
                                        </div>
                                        <div className="middleCard" style={TradeStyle.a.middleCard}>
                                            <div className="img" style={TradeStyle.a.img}>
                                                <img src={details.image[0] ? details.image[0] : err}
                                                    alt=""
                                                    style={{ width: "14vw", height: "14vw", objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="middleName" style={TradeStyle.a.middlename}>
                                                <p style={{ padding: 0, margin: 0, textAlign: "center" }}>{details.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons" style={TradeStyle.inner.buttons}>
                                    <Button type="primary" onClick={this.handleAConfirm}>Return</Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            default:
                return (
                    <div className="tradeCards" style={out ? TradeStyle.outFrame : TradeStyle.frame} onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>
                        <div className="content" style={TradeStyle.content} onClick={this.stopPropagation}>
                            <div className="title" style={TradeStyle.inner.title}></div>
                            <div className="innerContent" style={TradeStyle.inner.content}>
                                <p>Error</p>
                            </div>
                            <div className="buttons" style={TradeStyle.inner.buttons}>
                                <Button type="primary" onClick={() => { this.closeTradeCards(this.props.myUser.user_id) }}>Return</Button>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    const trade = state.tradeReducer
    const search = state.searchReducer
    const user = state.userReducer
    return {
        currentTrade: trade.currentTrade,
        myProducts: search.myProducts,
        allProducts: search.allProducts,
        myUser: user.myUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeTradeCards: (id) => {
            dispatch(actions_search.setFProducts(id))
            dispatch(actions_search.setMyProducts(id))
            dispatch(actions_trade.closeTradeCards())
            dispatch(actions_search.closeOutDetails())
            dispatch(actions_search.closeDetails())
        },
        closeAllCards: (id) => {
            dispatch(actions_search.setMyProducts(id))
            dispatch(actions_search.setFProducts(id))
            dispatch(actions_trade.closeTradeCards())
            dispatch(actions_search.closeOutDetails())
            dispatch(actions_search.closeDetails())
        },
        setMyProducts: (id) => {
            dispatch(actions_search.setMyProducts(id))
        },
        setFProducts: (id) => {
            dispatch(actions_search.setFProducts(id))
        },
        filterMyProducts: (id) => {
            dispatch(actions_search.filterMyProducts(id))
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
        updateProducts: arr => dispatch(updateProducts(arr)),
        setTradeHistory: (arr)=>{
            dispatch(actions_userPage.setTradeHistory(arr))
        },
        loading: ()=>{
            dispatch(actions_userPage.loading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeCards)