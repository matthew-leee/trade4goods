import React, { Component } from "react"
import { connect } from "react-redux"
import { Progress } from "antd"

class TradeHistory extends Component {
    constructor(props) {
        super(props)
        this.user = "user1"
    }

    render() {
        const userCred = this.props.users
            .filter((u) => {
                return u.displayed_name == this.user
            })
            .map((u) => { return u.credibility })
        const credComment = () => {
            const style = { marginTop: "1vw", color: "red" }
            if (userCred[0] < 5) {
                return (
                    <p style={style}>You liar</p>
                )
            } else if (userCred[0] == 5) {
                return (
                    <p style={style}>Not Bad</p>
                )
            } else {
                return (
                    <p style={style}>Trustworthy Trader</p>
                )
            }
        }
        return (
            <div style={{ width: "15vw", height: "93vh", backgroundColor: "#eafeea", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>Trade History</h1>
                <div className="credProgress">
                    <p>Your Trade Credibility</p>
                    <Progress type="circle" percent={userCred[0] * 10} />
                    {credComment()}
                </div>
                <div className="tradeGrade">
                <p>Trader Level</p>
                
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const u = state.userReducer
    return {
        users: u.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)