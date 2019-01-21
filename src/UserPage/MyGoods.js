import { Card, Icon } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class MyGoods extends Component {
    componentDidMount() {
        // assume me fetching some shit

    }
    render() {
        return (
            <div className="myGoods">
                <Card
                    title="MyGoods"
                    style={{ width: 600 }}
                >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Card
                            style={{ width: 180 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://media.karousell.com/media/photos/products/2019/01/10/tplink_n600__1000mb__tlwdr3600_wifi_n_gigabit_router_24ghz_5ghz_1547057675_7819267f0"
                                />
                            }
                            actions={[
                                <Link to="/addPhotos">
                                    <Icon type="setting" />
                                </Link>,

                                <Icon type="edit" />,

                                <Icon type="ellipsis" />
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
                    </div>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGoods)