import { Card, Icon, Popconfirm, message, Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import actions_userPage from "../../actions/userPage"
import actions_search from "../../actions/search"
import products from "../../../FakeData/products"
import SentReqCard from "./cards/SentReqCard"

import Axios from "axios"



import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'

const err = require('../asset/gif/error404.gif')

class SentReq extends Component {

    handleDelete = async (id) => {
        const other = this.props.allProducts
            .filter((u)=>{
                return u.offered_by.some((u)=>{
                    return u == id
                })
            })[0]
        const boo = window.confirm(`Rollback request to ${other.name}?`)
        if (boo) {
            const otherID = other.product_id
            const data = {
                product_offered: otherID,
                product_offering: id
            }
            try {
                const res = await Axios("https://localhost:8080/api/offer_product", {
                    method: 'delete',
                    data: data,
                    withCredentials: true
                })
                console.log(res)
    
                // fetch allProducts
                const pres = await Axios.get('https://localhost:8080/api/allProducts/')
                pres.data.forEach((u) => {
                    u.openOneModal = false
                    u.openOGModal = false
                    u.openMyGoodModal = false
                    u.openDELModal = false
                })
                this.props.storeAllProducts(pres.data)
    
                // fetch allUsers
                const users = await Axios.get('https://localhost:8080/api/allProfile/')
                this.props.storeAllUsers(users.data)
    
                // fetch myUser
                const user = await Axios('https://localhost:8080/api/profile', {
                    method: "get",
                    withCredentials: true
                })
                this.props.storeMyUser(user.data)
    
            } catch (err) {
                console.log (err)
            }

            message.success("deleted")
            
        } else {
            message.error("Rollback canceled")
        }
    }

    render() {
        const cards = this.props.allProducts
            .filter(u => { return u.status == 2 && u.uploaded_by == this.props.myUser.user_id })
            .slice(0, 3)
            .map((u) => {
                return (
                    <div>
                        <SentReqCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            accepted={u.status == 3}
                            rejected={u.status == 1}
                        />
                    </div>
                )
            })
        const allCards = this.props.allProducts
            .filter(u => { return u.status == 2 && u.uploaded_by == this.props.myUser.user_id })
            .map((u) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                        <SentReqCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            accepted={u.status == 3}
                            rejected={u.status == 1}
                        />
                    </Col>
                )
            })
        return (
            <div className="sentReq" style={{ marginRight: "2vw", marginLeft: "2vw" }}>

                <Card
                    title="Sent Request"
                    style={{ width: "30vw" }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {cards}
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={() => { this.props.handleModal("SQ") }}>
                                More
                            </Button>

                            {this.props.openSQModal &&
                                <Popup open={true} closeOnDocumentClick onClose={() => { this.props.handleModal("SQ") }}>
                                    <div style={content} >
                                        <a style={popUpCloseTag} onClick={() => { this.props.handleModal("SQ") }}>&times;</a>
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

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const s = state.userReducer
    const search = state.searchReducer
    return {
        myUser: s.myUser,
        openSQModal: s.openSQModal,
        products: s.products,
        result: s.result,
        submit: search.submit,
        productsArr: state.productsArr,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentReq)