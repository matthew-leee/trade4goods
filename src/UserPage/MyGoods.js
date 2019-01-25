import { Card, Icon, Popconfirm, message, Button, Modal } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import actions from "./actions"
import products from "../FakeData/products"
import GeneralTags from "../AddPhotos/tags_antd"
import ProductDetails from "./Details"

class MyGoods extends Component {
    componentDidMount() {
        products.forEach((u) => {
            u.openOneModal = false
        })
        this.props.handleProducts(products)
    }
    rerouteSearch = () => {
        if (this.props.submit){
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

    handleDelete = (e) => {
        const boo = window.confirm("delete?")
        if (boo) {
            message.success("deleted")
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        } else {
            message.error("no delete")
        }
    }

    render() {
        const cards = this.props.products.map((u) => {
            return (
                <div>
                    <Card
                        style={{ width: 180 }}
                        cover={
                            <img
                                alt={u.name}
                                src={u.image[0]}
                                onClick={() => { this.props.handleOneModal(u.product_id) }}
                            />
                        }
                        actions={[
                            <Icon type="edit" onClick={this.handleEdit} />,
                            <Icon type="delete" onClick={this.handleDelete} />
                        ]}
                        key={u.product_id}
                        id={u.product_id}
                    >
                        <Card.Meta
                            title={u.name}
                            description={u.description}
                        />
                        <GeneralTags tags={u.tags} closable={false} />

                    </Card>
                    <Modal
                        centered
                        visible={u.openOneModal}
                        onCancel={() => { this.props.handleOneModal(u.product_id) }}
                        onOk={() => { this.props.handleOneModal(u.product_id) }}
                    >
                        <ProductDetails details={u} />
                    </Modal>
                </div>

            )
        })
        return (
            <div className="myGoods">
            {this.rerouteSearch()}
                <h1>{this.props.result}</h1>
                <Card
                    title="MyGoods"
                    style={{ width: 800 }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {cards}
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={this.props.handleModal}>
                                click me bastard
                            </Button>
                            <Modal
                                title="Add Photos"
                                centered
                                visible={this.props.openModal}
                                onCancel={this.props.handleModal}
                                onOk={this.props.handleModal}
                            >
                            </Modal>

                        </div>
                    </div>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const s = state.userReducers
    const search = state.searchReducers
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
            dispatch(actions.openModal())
        },
        handleProducts: (products) => {
            dispatch(actions.fetchProducts(products))
        },
        handleOneModal: (id) => {
            dispatch(actions.openOneModal(id))
        },
        saveSearch: (result) =>{
            dispatch(actions.saveSearch(result))
        },
        clearSearch: ()=>{
            dispatch(actions.clearSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGoods)