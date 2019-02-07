import React, {Component} from "react"
import {connect} from "react-redux"
import actions_newUserPage from "../../actions/newUserPage"
import NewNav from "./NewNav"
import MyProf from "./MyProf"
import MyG from "./MyG"
import FollowedG from "./FollowedG"
import Uploads from "./Upload"
import BigCards from "./cards/BigCards"

// css
import NewMainStyle from "./style/NewMain"

class NewMain extends Component {
    constructor(props){
        super(props)
        this.state={
            cPStyle: NewMainStyle.cP,
            mPStyle: NewMainStyle.mainPanel
        }
    }

    handleClick = (e)=> {
        e.preventDefault()
        this.setState({
            cPStyle: NewMainStyle.cP_clicked,
            mPStyle: NewMainStyle.mainPanel_cP_clicked
        })
    }

    render() {
        const {nav, currentProduct} = this.props
        return (
            <div className="newMain" style={NewMainStyle.newMain}>

                <div className="newNav" style={NewMainStyle.newNav}>
                    <NewNav handleClick={this.handleClick} />
                </div>

                <div className="controlPanel" style={this.state.cPStyle}>
                    <p>cP</p>
                </div>

                <div className="mainPanel" style={this.state.mPStyle}>
                    {nav.MyProf && <MyProf />}
                    {nav.MyG && <MyG />}
                    {nav.FollowedG && <FollowedG />}
                    {nav.Upload && <Uploads />}
                    {currentProduct.details && <BigCards />}
                </div>
            </div>
        )
    }
}

const mapStateToPrpos = (state) => {
    const nu = state.newUserReducer
    const search = state.searchReducer
    return {
        nav: nu.nav,
        currentProduct: search.currentProduct
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToPrpos, mapDispatchToProps)(NewMain)