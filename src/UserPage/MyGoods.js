import { Card, Icon, Popconfirm, message, Button, Modal } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import actions from "./actions"

class MyGoods extends Component {
    componentDidMount() {
        // assume me fetching some shit
        // const json = axios.get("/users/someone")
        // data to fetch: imgsrc/Title/id/description
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
        return (
            <div className="myGoods">
                <Card
                    title="MyGoods"
                    style={{ width: 800 }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Card
                            style={{ width: 180 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://media.karousell.com/media/photos/products/2019/01/10/tplink_n600__1000mb__tlwdr3600_wifi_n_gigabit_router_24ghz_5ghz_1547057675_7819267f0"
                                />
                            }
                            actions={[
                                <Icon type="edit" onClick={this.handleEdit} />,
                                <Icon type="delete" onClick={this.handleDelete} />
                            ]}
                            key={12345}
                            id={12345}
                        >
                            <Card.Meta
                                title="Router. Good?"
                                description="not so good"
                            />
                        </Card>
                        <Card
                            style={{ width: 180 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://media.karousell.com/media/photos/products/2019/01/10/tplink_n600__1000mb__tlwdr3600_wifi_n_gigabit_router_24ghz_5ghz_1547057675_7819267f0"
                                />
                            }
                            actions={[
                                <Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />
                            ]}
                        >
                            <Card.Meta
                                title="Router. Good?"
                                description="not so good"
                            />
                        </Card>
                        <Card
                            style={{ width: 180 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://media.karousell.com/media/photos/products/2019/01/10/tplink_n600__1000mb__tlwdr3600_wifi_n_gigabit_router_24ghz_5ghz_1547057675_7819267f0"
                                />
                            }
                            actions={[
                                <Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />
                            ]}
                        >
                            <Card.Meta
                                title="Router. Good?"
                                description="not so good"
                            />
                        </Card>
                        <div className="addPhotoBox" style={{ width: 180, height: 180, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
                            <Button onClick={this.props.handleModal}>
                                click me bastard
                            </Button>
                            <Modal
                                title="Vertically centered modal dialog"
                                centered
                                visible={this.props.openModal}
                                onOk={this.props.handleModal}
                                onCancel={this.props.handleModal}
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
    return {
        openModal: s.openModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleModal: () => {
            dispatch(actions.openModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGoods)