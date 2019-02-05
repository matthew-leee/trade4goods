import React, { Component } from "react"
import { connect } from "react-redux"

class SentReq extends Component {
    render() {
        return (
            <div className="SentReq">
                <p>SentReq</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SentReq)

