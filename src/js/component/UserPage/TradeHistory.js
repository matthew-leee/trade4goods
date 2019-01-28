import React, { Component } from "react"
import { connect } from "react-redux"

class TradeHistory extends Component {
    render() {
        return (
            <div style={{ width: "15vw", height: "93vh", backgroundColor: "#eafeea", display: "flex", justifyContent: "center" }}>
                <h1>Trade History</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)