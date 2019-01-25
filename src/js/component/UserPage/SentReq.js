import { Card, Icon, Popconfirm, message, Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import actions_userPage from "../../actions/userPage"
import products from "../../../FakeData/products"
import SentReqCard from "./cards/SentReqCard"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'

class SentReq extends Component {

    componentDidMount() {
        products.forEach((u) => {
            u.openOneModal = false
        })
        this.props.handleProducts(products)
        this.username = "user1"
    }

    rerouteSearch = () => {
        if (this.props.submit) {
            this.props.saveSearch(this.props.submit)
            this.props.clearSearch()
        }
    }

    handleDelete = (e) => {
        const boo = window.confirm("delete request?")
        if (boo) {
            message.success("deleted")
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        } else {
            message.error("no delete")
        }
    }

    handleContact = (e) =>{
        const boo = window.confirm("contact owner?")
        if (boo) {
            message.success("contact!")
        } else {
            message.error("no contact")
        }
    }

    render() {
        console.log (this.props.products)
        const cards = this.props.products
            .slice(0, 3)
            .map((u) => {
                return (
                    <div>
                        <SentReqCard
                            name={u.name}
                            image={u.image[0]}
                            id={u.product_id}
                            description={u.description}
                            tags={u.tags}
                            handleContact={this.handleContact}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            accepted={u.sold_to == this.username}
                            rejected={u.sold_to != this.username && u.status == 2}
                        />
                    </div>
                )
            })
        const allCards = this.props.products
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <SentReqCard
                            name={u.name}
                            image={u.image[0]}
                            id={u.product_id}
                            description={u.description}
                            tags={u.tags}
                            handleContact={this.handleContact}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            accepted={u.sold_to == this.username}
                            rejected={!u.sold_to == this.username && u.status == 2}
                        />
                    </Col>
                )
            })
        return (
            <div className="sentReq">
                {this.rerouteSearch()}
                <Card
                    title="Sent Request"
                    style={{ width: "40vw" }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {cards}
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={this.props.handleModal}>
                                click me bastard
                            </Button>

                            {this.props.openModal && 
                            <Popup open={true} closeOnDocumentClick onClose={this.props.handleModal}>
                                <div style={content} >
                                    <a style={popUpCloseTag} onClick={this.props.handleModal}>&times;</a>
                                    <div>
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
                <h1>{this.props.result}</h1>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const s = state.userReducer
    const search = state.searchReducer
    return {
        openModal: s.openModal,
        products: s.products,
        result: s.result,
        submit: search.submit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleModal: () => {
            dispatch(actions_userPage.openModal())
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

export default connect(mapStateToProps, mapDispatchToProps)(SentReq)