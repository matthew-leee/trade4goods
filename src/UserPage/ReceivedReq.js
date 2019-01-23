import { Card } from "antd"
import React, { Component } from "react"
import { connect } from "react-redux"

class ReceivedReq extends Component {
    render() {
        return (
            <div className="myGoods">
                <Card
                    title="MyGoods"
                    style={{ width: 300 }}
                >
                    <p>Card content</p>
                    <Card
                        title="MyGoods"
                        style={{ width: 50 }}
                    >
                        <p>Card content</p>
                    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedReq)