import React, { Component } from "react"
import { connect } from "react-redux"
import BigCardsStyle from "../style/BigCards"
import actions_search from "../../../actions/search"
import actions_userPage from "../../../actions/userPage"
import ProductDetails from "./Details"
import Axios from "axios"
import { updateProducts } from '../../../actions/hello'

class BigOutCards extends Component {
    stopPropagation = (e) => {
        e.stopPropagation()
    }

    closeOutDetails = async () => {
        try {
            this.props.loading()
            const pres = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)
            this.props.updateProducts(pres.data)
            // fetch allUsers
            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            if (this.props.myUser.user_id){
                const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
                    method: "get",
                    withCredentials: true
                })
                this.props.storeMyUser(user.data)
            }
            this.props.closeOutDetails()
            this.props.loading()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { details, whom, which } = this.props.currentOutProduct
        return (
            <div className="bigCards" onClick={this.closeOutDetails} style={BigCardsStyle.out}>
                <div className="content" style={BigCardsStyle.content} onClick={this.stopPropagation}>
                    <ProductDetails details={details[0]} whom={whom} status={which} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const search = state.searchReducer
    const user = state.userReducer
    return {
        currentOutProduct: search.currentOutProduct,
        myUser: user.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeOutDetails: () => {
            dispatch(actions_search.closeOutDetails())
        },
        storeAllProducts: (products) => {
            dispatch(actions_search.storeAllProducts(products))
        },
        storeAllUsers: (allUsers) => {
            dispatch(actions_userPage.storeAllUsers(allUsers))
        },
        storeMyUser: (user) => {
            dispatch(actions_userPage.storeMyUser(user))
        },
        updateProducts: arr => dispatch(updateProducts(arr)),
        loading: ()=>{
            dispatch(actions_userPage.loading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BigOutCards)