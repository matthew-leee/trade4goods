import React, { Component } from "react"
import MyGStyle from "../style/MyG"
import FollowedGStyle from "../style/FollowedG"
import { Icon } from "antd"
import {connect} from "react-redux"
import actions_userPage from "../../../actions/userPage"
import actions_search from "../../../actions/search"
import Axios from "axios"
import { updateProducts } from '../../../actions/hello'

class MyGCards extends Component {
    render() {
        const { image, name, key, traded, trading, withR, nth, product_id, na, a, requested } = this.props

        return (
            <div className="MyGCard" style={MyGStyle.frame} key={key}>
                <div className="imgContainer" style={MyGStyle.img.container}>

                    {traded && <div className="imgFrame" 
                    style={MyGStyle.img.status.traded}
                    onClick={()=>{this.props.openDetails(product_id,"my","traded", this.props.allUsers)}}
                    ></div>}

                    {trading && <div className="imgFrame" 
                    style={MyGStyle.img.status.trading}
                    onClick={()=>{this.props.openDetails(product_id,"my","trading", this.props.allUsers)}}
                    ></div>}

                    {withR && <div className="imgFrame" 
                    style={MyGStyle.img.status.withR}
                    onClick={()=>{this.props.openDetails(product_id,"my","withR", this.props.allUsers)}}
                    ></div>}

                    {nth && <div className="imgFrame" 
                    style={MyGStyle.img.frame}
                    onClick={()=>{this.props.openDetails(product_id,"my","nth", this.props.allUsers)}}
                    ></div>}

                    {/* for FollowedG */}
                    {na && <div className="imgFrame" 
                    style={FollowedGStyle.cards.na}
                    onClick={()=>{this.props.openDetails(product_id,"other","na", this.props.allUsers)}}
                    ></div>}
                    {a && <div className="imgFrame" 
                    style={FollowedGStyle.cards.a}
                    onClick={()=>{this.props.openDetails(product_id,"other","a", this.props.allUsers)}}
                    ></div>}
                    {requested && <div className="imgFrame" 
                    style={FollowedGStyle.cards.requested}
                    onClick={()=>{this.props.openDetails(product_id,"other","requested", this.props.allUsers)}}
                    ></div>}

                    <img src={image} alt="" style={MyGStyle.img.img} />

                </div>
                <div className="status" style={MyGStyle.status.container}>
                    <Icon type="edit" />
                    <p style={{ padding: 0, margin: 0 }}>{name}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer
    return {    
        allUsers: user.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openDetails: async (id, whom, which, allUsers)=>{
            try {
                const products = await Axios('https://localhost:8443/api/allProducts/', {
                    method: "get",
                    withCredentials: true
                })

                products.data.forEach((u) => {
                    u.openOneModal = false
                    u.openOGModal = false
                    u.openMyGoodModal = false
                    u.openDELModal = false
                })
                dispatch(actions_search.storeAllProducts(products.data))
                dispatch(updateProducts(products.data))
                const cmtIds = products.data.filter((u)=>{
                    return u.product_id == id
                })[0].comments

                // const ids = res.data[0].map((u) => { return u[0] })
                const comments = cmtIds.map(async (comment_id) => {
                    const sth = await Axios(`https://localhost:8443/api/comment/${comment_id}`, {
                        method: "get",
                        withCredentials: true
                    })
                    const comment = sth.data[0]
                    const user = allUsers.filter((u) => {
                        return u.user_id == comment.commentator
                    })[0].displayed_name
                    const day = Math.floor((new Date() - new Date(comment.comment_at))/86400000)
                        return {
                            title: user,
                            content: comment.comment,
                            description: `${day} days ago`
                        }
                })

                const newStatus = products.data.filter((u)=>{
                    return u.product_id == id
                })[0].status

                if (newStatus == 3){
                    Promise.all(comments)
                    .then((results) => {
                        dispatch(actions_search.setMyProducts(id))
                        dispatch(actions_search.setFProducts(id))
                        dispatch(actions_userPage.storeAllComments(results, id))
                        dispatch(actions_search.openDetails(id,whom,"traded"))
                    })
                } else {
                    Promise.all(comments)
                    .then((results) => {
                        dispatch(actions_search.setMyProducts(id))
                        dispatch(actions_search.setFProducts(id))
                        dispatch(actions_userPage.storeAllComments(results, id))
                        dispatch(actions_search.openDetails(id,whom,which))
                    })
                }
            }catch(err){
                console.log (err)
            }
            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGCards)