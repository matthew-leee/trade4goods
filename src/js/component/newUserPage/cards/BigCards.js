import React, {Component} from "react"
import {connect} from "react-redux"
import BigCardsStyle from "../style/BigCards"
import actions_search from "../../../actions/search"
import ProductDetails from "./Details"

class BigCards extends Component {
    stopPropagation=(e)=>{
        e.stopPropagation()
    }
    render(){
        const {details, whom, which} = this.props.currentProduct
        return (
            <div className="bigCards" onClick={this.props.closeDetails} style={BigCardsStyle.frame}>
                <div className="content"style={BigCardsStyle.content} onClick={this.stopPropagation}>
                    <ProductDetails details={details[0]} whom={whom} status={which} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const search = state.searchReducer
    return {
        currentProduct: search.currentProduct
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        closeDetails: ()=>{
            dispatch(actions_search.closeDetails())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BigCards)