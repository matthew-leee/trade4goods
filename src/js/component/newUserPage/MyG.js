import React, { Component } from "react"
import { connect } from "react-redux"

class MyG extends Component {
    render() {
        return (
            <div className="MyG">
                <p>MyG</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyG) 