import React, { Component } from "react"
import { connect } from "react-redux"

class Upload extends Component {
    render() {
        return (
            <div className="Upload">
                <p>Upload</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Upload)

