import React, { Component } from "react"
import { Button, Row, Col, Card } from "antd"
import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";
import { connect } from "react-redux"
import actions_trade from "../../actions/trade"
import MyGoodsCard from "./cards/MyGoodsCard"
import RegistrationForm from "../RegistrationForm";

class Trade extends Component {

    handlePlaceOffer= async () => {
        const data = {
            product_offered: this.props.selected,
            product_offering: this.props.details.product_id
        }
        const res = await Axios("https://localhost:8443/api/offerProduct", {
            method: 'post',
            data: data,
            withCredentials: true
        })
        console.log (res)
        // finished trading
        this.props.clearSelect()

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
                return u.uploaded_by == this.props.myUser.user_id
            })
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <MyGoodsCard
                            name={u.name}
                            image={u.image[0]}
                            id={u.product_id}
                            description={u.description}
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
        
        const openOGModal = this.props.allProducts.filter((u)=>{
            return u.product_id == details.product_id
        })[0].openOGModal

        switch (status) {
            case "myP":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button style={{ marginBottom: "1vw" }} ghost type="primary">Check Received Offer</Button>
                    </div>
                )
            case "offered":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button style={{ marginBottom: "1vw" }} ghost type="primary">Edit Offer</Button>
                    </div>
                )
            case "otherP":
                return (
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button onClick={()=>{this.props.openOGModal(details.product_id)}} style={{ marginBottom: "1vw" }} ghost type="danger">Make an Offer</Button>
                        {openOGModal &&
                            <Popup open={true} closeOnDocumentClick onClose={()=>{this.props.openOGModal(details.product_id)}}>
                                <div style={{ display: "flex", flexDirection: "column",overflowY: "scroll", width: "50vw", height: "50vh" }}>
                                <a style={popUpCloseTag} onClick={()=>{this.props.openOGModal(details.product_id)}}>&times;</a>
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
                                                <div className="selectedCard" style={{width: "7vw", height: "7vw", backgroundColor: "yellow",
                                                display: "flex", justifyContent: "center", alignItems: "center"
                                                }}>
                                                    <p style={{color: "red"}}>Select a product from Left Panel</p>
                                                </div>}
                                                <div className="confirmTrade">
                                                    <Button onClick={this.handlePlaceOffer}  type="danger">Confirm Placing Offer</Button>
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
                    <div className="trade" style={{}}>
                        <h4>Trade</h4>
                        <Button style={{ marginBottom: "1vw" }} ghost type="danger">Please Login</Button>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    const trade = state.tradeReducer
    const search = state.searchReducer
    return {
        myUser: user.myUser,
        openMyGoodModal: trade.openMyGoodModal,
        openOGModal: trade.openOGModal,
        selected: trade.selected,
        allProducts: search.allProducts
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
        handleSelect: (id) => {
            dispatch(actions_trade.selectMyGood(id))
        },
        clearSelect: () =>{
            dispatch(actions_trade.clearSelect())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)