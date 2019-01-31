import { Card, Icon, Popconfirm, message, Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import actions_userPage from "../../actions/userPage"
import products from "../../../FakeData/products"
import ReceivedReqCard from "./cards/ReceivedReqCard"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'

const err = require('../asset/gif/error404.gif')

class ReceivedReq extends Component {

    handleDecline = (e) => {
        const boo = window.confirm("decline request?")
        if (boo) {
            message.success("declined")
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        } else {
            message.error("cancel declining")
        }
    }

    handleAccept = (e) => {
        const boo = window.confirm("Accept request?")
        if (boo) {
            message.success("Accepted!")
        } else {
            message.error("Cancel accepting")
        }
    }

    render() {
        const cards = this.props.allProducts
        .filter(u => { return u.offered_by.length > 0 && u.uploaded_by == this.props.myUser.user_id })
            .slice(0, 3)
            .map((u) => {
                return (
                    <div>
                        <ReceivedReqCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleAccept={this.handleAccept}
                            handleDecline={this.handleDecline}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                        />
                    </div>
                )
            })
        const allCards = this.props.allProducts
            .filter(u => { return u.offered_by.length > 0 && u.uploaded_by == this.props.myUser.user_id })
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <ReceivedReqCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleAccept={this.handleAccept}
                            handleDecline={this.handleDecline}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                        />
                    </Col>
                )
            })
        return (
            <div className="receivedReq" style={{ marginRight: "2vw", marginLeft: "2vw" }}>
               
                <Card
                    title="Goods With Request"
                    style={{ width: "30vw" }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {cards}
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={() => { this.props.handleModal("RQ") }}>
                                More
                            </Button>

                            {this.props.openRQModal &&
                                <Popup open={true} closeOnDocumentClick onClose={() => { this.props.handleModal("RQ") }}>
                                    <div style={content} >
                                        <a style={popUpCloseTag} onClick={() => { this.props.handleModal("RQ") }}>&times;</a>
                                        <div style={{display:"flex",flexDirection: 'column', overflowY: "scroll", width: "50vw", height: "50vh"}}>
                                            <h1>My Goods</h1>
                                            <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 16 }}>
                                                {allCards}
                                            </Row>
                                        </div>
                                    </div>
                                </Popup>}

                        </div>
                    </div>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const s = state.userReducer
    const search = state.searchReducer
    const rooot = state.roootReducer
    return {
        myUser: s.myUser,
        openRQModal: s.openRQModal,
        products: s.products,
        result: s.result,
        submit: search.submit,
        productsArr: rooot.productsArr,
        allProducts: search.allProducts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleModal: (column) => {
            dispatch(actions_userPage.openModal(column))
        },
        handleProducts: (products) => {
            dispatch(actions_userPage.fetchProducts(products))
        },
        handleOneModal: (id) => {
            dispatch(actions_userPage.openOneModal(id))
        },
        saveSearch: (result) => {
            dispatch(actions_userPage.saveSearch(result))
        },
        clearSearch: () => {
            dispatch(actions_userPage.clearSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedReq)