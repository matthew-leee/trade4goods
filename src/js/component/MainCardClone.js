import React from 'react';
import { Card, Icon, Avatar, Skeleton } from 'antd';
import { connect } from "react-redux"

import ProductDetails from "./UserPage/Details"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'

import actions_userPage from "../actions/userPage"
import actions_search from "../actions/search"
import Axios from 'axios';
import { updateProducts } from '../actions/hello'

const { Meta } = Card;

class MainCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      imgPic: require('./asset/gif/loadingpic.gif')
    }

  }
  componentDidMount() {
    const img = new Image();
    if (!this.props.imgUrl) {
      img.src = require('./asset/gif/replaceNoImg.gif')
    } else {

      img.src = this.props.imgUrl;
    }
    img.onload = () => {
      this.setState({
        loading: false,
        imgPic: img.src
      });
    };
    img.onerror = (err) => {
      this.setState({
        loading: false,
        error: true,
        imgPic: require('./asset/gif/error404.gif')
      });
    };
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
      error: false,
      imgPic: require('./asset/gif/loadingpic.gif')
    })
  }

  handleLike = async (id) => {
    try {
      const res = await Axios(`${process.env.REACT_APP_BACKEND_URL}/api/like/${id}`, {
        method: "put",
        withCredentials: true
      })
      if (res.status == 200) {
        const products = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/', {
          method: "get",
          withCredentials: true
        })

        products.data.forEach((u) => {
          u.openOneModal = false
          u.openDELModal = false
          u.openOGModal = false
          u.openMyGoodModal = false
        })
        this.props.storeAllProducts(products.data)
        this.props.updateProducts(products.data)
        // fetch allUsers
        const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
        this.props.storeAllUsers(users.data)

        // fetch myUser
        const user = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/profile', {
          method: "get",
          withCredentials: true
        })
        this.props.storeMyUser(user.data)

      }
    } catch (err) {
      console.log("like err")
    }
  }


  render() {

    const likedarr = this.props.allProducts
      .filter((u) => {
        return u.product_id == this.props.details.product_id
      })[0].liked_by

    const liked = likedarr.some((u) => {
      return u == this.props.myUser.user_id
    })

    const myProductArr = this.props.myUser.uploaded_products ? this.props.myUser.uploaded_products : []

    const owner = myProductArr.some((u) => {
      return u == this.props.details.product_id
    }) ? "my" : "other"

    const status = () => {
      const u = this.props.details
      const offered = u.offered_by.some((offer) => {
        return myProductArr.some((a) => {
          return a == offer
        })
      })
      const isLoggedIn = this.props.myUser.user_id? true: false
      if (isLoggedIn){
        if (owner == "my") {
          if (u.status == 3) {
            return "traded"
          } else if (u.offered_by.length > 0 && u.sold_to == null) {
            return "withR"
          } else if (u.status == 2) {
            return "trading"
          } else if (u.status == 1 && u.offered_by.length == 0) {
            return "nth"
          }
        } else {
          if (u.status > 1) {
            return "na"
          } else if (u.status == 1) {
            return "a"
          } else if (offered && u.status != 3) {
            return "requested"
          }
        }
      } else {
        return "login"
      }
      
    }

    switch (status()) {
      case "traded": case "withR": case "trading": case "nth":
        return (
          <div>
            <Card
              hoverable
              style={{ width: "100%", marginTop: "10px" }}
              cover={
                <img alt="example" src={this.state.imgPic} onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />
              }
              actions={[
                <Icon type="message" onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />]}
            >
              <Skeleton loading={this.state.loading} title paragraph active>
                <Meta
                  title={this.props.name}
                  description={this.props.description}
                />
              </Skeleton>
            </Card>
          </div>
        )
      default:
        return (
          <div>
            {!liked &&
              <Card
                hoverable
                style={{ width: "100%", marginTop: "10px" }}
                cover={
                  <img alt="example" src={this.state.imgPic} onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />
                }
                actions={[
                  <Icon type="heart" onClick={() => { this.handleLike(this.props.details.product_id) }} />,
                  <Icon type="message" onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />]}
              >
                <Skeleton loading={this.state.loading} title paragraph active>
                  <Meta
                    title={this.props.name}
                    description={this.props.description}
                  />
                </Skeleton>
              </Card>}

            {liked &&
              <Card
                hoverable
                style={{ width: "100%", marginTop: "10px" }}
                cover={
                  <img alt="example" src={this.state.imgPic} onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />
                }
                actions={[
                  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" onClick={() => { this.handleLike(this.props.details.product_id) }} />,
                  <Icon type="message" onClick={() => { this.props.openOutDetails(this.props.details.product_id, owner, status(), this.props.allUsers) }} />,
                ]}
              >
                <Skeleton loading={this.state.loading} title paragraph active>
                  <Meta
                    title={this.props.name}
                    description={this.props.description} />
                </Skeleton>
              </Card>}
          </div>
        )
    }
  }
}

const mapStateToProps = (state) => {
  const search = state.searchReducer
  const user = state.userReducer
  return {
    allProducts: search.allProducts,
    allUsers: user.allUsers,
    myUser: user.myUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOneModal: (id) => {
      dispatch(actions_userPage.openOneModal(id))
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
    openOutDetails: async (id, whom, which, allUsers) => {
      try {
        const products = await Axios(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/', {
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
        const cmtIds = products.data.filter((u) => {
          return u.product_id == id
        })[0].comments

        // const ids = res.data[0].map((u) => { return u[0] })
        const comments = cmtIds.map(async (comment_id) => {
          const sth = await Axios(`${process.env.REACT_APP_BACKEND_URL}/api/comment/${comment_id}`, {
            method: "get",
            withCredentials: true
          })
          const comment = sth.data[0]
          const user = allUsers.filter((u) => {
            return u.user_id == comment.commentator
          })[0].displayed_name
          const day = Math.floor((new Date() - new Date(comment.comment_at)) / 86400000)
          return {
            title: user,
            content: comment.comment,
            description: `${day} days ago`
          }
        })

        const newStatus = products.data.filter((u) => {
          return u.product_id == id
        })[0].status

        if (newStatus == 3) {
          Promise.all(comments)
            .then((results) => {
              dispatch(actions_search.setMyProducts(id))
              dispatch(actions_search.setFProducts(id))
              dispatch(actions_userPage.storeAllComments(results, id))
              // open OUT details
              dispatch(actions_search.openOutDetails(id, whom, "traded"))
            })
        } else {
          Promise.all(comments)
            .then((results) => {
              dispatch(actions_search.setMyProducts(id))
              dispatch(actions_search.setFProducts(id))
              dispatch(actions_userPage.storeAllComments(results, id))
              // open OUT details
              dispatch(actions_search.openOutDetails(id, whom, which))
            })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);