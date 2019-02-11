import React, { Component } from "react"
import { connect } from "react-redux"
import BigCardsStyle from "../style/BigCards"
import actions_search from "../../../actions/search"
import actions_userPage from "../../../actions/userPage"
import ProductDetails from "./Details"
import Axios from "axios"

class BigOutCards extends Component {
    stopPropagation = (e) => {
        e.stopPropagation()
    }

    closeOutDetails = async () => {
        try {
            const pres = await Axios.get('https://localhost:8443/api/allProducts/')
            pres.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openMyGoodModal = false
                u.openDELModal = false
            })
            this.props.storeAllProducts(pres.data)

            // fetch allUsers
            const users = await Axios.get('https://localhost:8443/api/allProfile/')
            this.props.storeAllUsers(users.data)

            // fetch myUser
            const user = await Axios('https://localhost:8443/api/profile', {
                method: "get",
                withCredentials: true
            })
            this.props.storeMyUser(user.data)
            this.props.closeOutDetails(this.props.myUser.user_id)
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
        closeOutDetails: (id) => {
            // dispatch(actions_search.setMyProducts(id))
            // dispatch(actions_search.setFProducts(id))
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BigOutCards)