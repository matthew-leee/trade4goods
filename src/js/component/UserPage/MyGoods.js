import { Card, Icon, Popconfirm, message, Button, Modal, Row, Col } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import actions_userPage from "../../actions/userPage"
import actions_search from "../../actions/search"

import MyGoodsCard from "./cards/MyGoodsCard"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../compCSS/popupCss'
import Axios from "axios";

const err = require('../asset/gif/error404.gif')

class MyGoods extends Component {

    componentDidMount = () => {
        // const products = this.props.allProducts
        // .filter((u)=> {
        //     return u.uploaded_by == this.props.myUser.user_id
        // })
        // this.props.handleProducts(products)
    }

    rerouteSearch = () => {
        if (this.props.submit) {
            this.props.saveSearch(this.props.submit)
            this.props.clearSearch()
        }
    }

    handleEdit = (e) => {
        const boo = window.confirm("edit?")
        if (boo) {
            message.success("edited")
            console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id)
            // dispatch an action to redux, change the state, then change the render
            // the display none below is just for demo
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            // or just change redux?
        } else {
            message.error("no edit")
        }
    }

    handleDelete = async (id) => {
        const boo = window.confirm("delete?")
        if (boo) {
            try {
                const res = await Axios(`https://localhost:8443/api/product/${id}`, {
                    method: "delete",
                    withCredentials: true
                })
                console.log(res)

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
            message.success("deleted")
        } else {
            message.error("no delete")
        }
    }

    render() {
        const cards = this.props.allProducts
            .filter((u) => {
                return u.uploaded_by == this.props.myUser.user_id
            })
            .slice(0, 3)
            .map((u) => {
                return (
                    <div>
                        <MyGoodsCard
                            name={u.name}
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            trade={false}
                        />
                    </div>
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
                            image={u.image[0] ? u.image[0] : err}
                            id={u.product_id}
                            description={u.description.length < 30 ? u.description : `${u.description.slice(0, 30)}...`}
                            tags={u.tags}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleOneModal={this.props.handleOneModal}
                            openOneModal={u.openOneModal}
                            allDetails={u}
                            trade={false}
                        />
                    </Col>
                )
            })
        return (
            <div className="myGoods" style={{ marginRight: "2vw", marginLeft: "2vw" }}>

                <Card
                    title="My Goods"
                    style={{ width: "30vw" }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {cards}
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={() => { this.props.handleModal("MG") }}>
                                More
                            </Button>

                            {this.props.openMGModal &&
                                <Popup open={true} closeOnDocumentClick onClose={() => { this.props.handleModal("MG") }}>
                                    <div style={content} >
                                        <a style={popUpCloseTag} onClick={() => { this.props.handleModal("MG") }}>&times;</a>
                                        <div style={{ display: "flex", flexDirection: 'column', overflowY: "scroll", width: "50vw", height: "50vh" }}>
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
    const rooot = state.roootReducer
    return {
        openMGModal: s.openMGModal,
        products: s.products,
        result: s.result,
        myUser: s.myUser,
        submit: search.submit,
        allProducts: search.allProducts,
        productsArr: rooot.productsArr
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

export default connect(mapStateToProps, mapDispatchToProps)(MyGoods)