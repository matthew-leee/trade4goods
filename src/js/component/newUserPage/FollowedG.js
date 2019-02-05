import React, {Component} from "react"
import {connect} from "react-redux"

class FollowedG extends Component {
    render(){
        return (
            <div className="FollowedG">
                <p>FollowedG</p>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowedG)