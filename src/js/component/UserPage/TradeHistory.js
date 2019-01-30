import React, { Component } from "react"
import { connect } from "react-redux"
import { Progress } from "antd"

class TradeHistory extends Component {

    render() {
        const userCred = this.props.myUser.credibility
        console.log (userCred)
        const credComment = () => {
            const style = { marginTop: "1vw", color: "red" }
            if (userCred < 5 ) {
                return (
                    <p style={style}>You liar</p>
                )
            } else if (userCred == 5) {
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
                    <Progress type="circle" percent={userCred * 10} />
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
        myUser: u.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)