import React from 'react';
import { Card, Icon, Avatar, Skeleton } from 'antd';
import { connect } from "react-redux"

import ProductDetails from "./UserPage/Details"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'

import actions_userPage from "../actions/userPage"
import actions_search from "../actions/search"
import Axios from 'axios';

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

  handleLike = async (id) => {
    try {
      console.log("clicked")
      const res = await Axios(`https://localhost:8443/api/like/${id}`, {
        method: "put",
        withCredentials: true
      })
      if (res.status == 200) {
        console.log('res')
        const products = await Axios('https://localhost:8443/api/allProducts/', {
          method: "get",
          withCredentials: true
        })

        products.data.forEach((u) => {
          u.openOneModal = false
          u.openDELModal = false
          u.openOGModal = false
          u.openMyGoodModal = false
        })
        console.log(products)
        this.props.storeAllProducts(products.data)

        // fetch allUsers
        const users = await Axios.get('https://localhost:8443/api/allProfile/')
        this.props.storeAllUsers(users.data)

        // fetch myUser
        const user = await Axios('https://localhost:8443/api/profile', {
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

    const openOneModal = this.props.allProducts
      .filter((u) => {
        return u.product_id == this.props.details.product_id
      })[0].openOneModal

    const likedarr = this.props.allProducts
      .filter((u) => {
        return u.product_id == this.props.details.product_id
      })[0].liked_by

    const liked = likedarr.some((u) => {
      return u == this.props.myUser.user_id
    })

    return (
      <div>
        {!liked &&
          <Card
            hoverable
            style={{ width: "100%", marginTop: "10px" }}
            cover={
              <img alt="example" src={this.state.imgPic} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }} />
            }
            actions={[
              <Icon type="heart" onClick={() => { this.handleLike(this.props.details.product_id) }} />,
              <Icon type="message" onClick={() => { this.props.handleOneModal(this.props.details.product_id) }} />,
              <Icon type="share-alt" />]}
          >

            <Skeleton loading={this.state.loading} title paragraph active>
              <Meta
                title={this.props.name}
                description={this.props.description}
                avatar={<Avatar src={this.props.details.profile_picture} />}
              />
            </Skeleton>

            {openOneModal &&
              <Popup open={true} onClose={() => { this.props.handleOneModal(this.props.details.product_id) }}>
                <div style={content} >
                  <a style={popUpCloseTag} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }}>&times;</a>
                  <ProductDetails details={this.props.details} />
                </div>
              </Popup>}

          </Card>}

        {liked &&
          <Card
            hoverable
            style={{ width: "100%", marginTop: "10px" }}
            cover={
              <img alt="example" src={this.state.imgPic} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }} />
            }
            actions={[
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" onClick={() => { this.handleLike(this.props.details.product_id) }} />,
              <Icon type="message" onClick={() => { this.props.handleOneModal(this.props.details.product_id) }} />,
              <Icon type="share-alt" />]}
          >

            <Skeleton loading={this.state.loading} title paragraph active>
              <Meta
                title={this.props.name}
                description={this.props.description}
                avatar={<Avatar src={this.props.details.profile_picture} />}
              />
            </Skeleton>

            {openOneModal &&
              <Popup open={true} onClose={() => { this.props.handleOneModal(this.props.details.product_id) }}>
                <div style={content} >
                  <a style={popUpCloseTag} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }}>&times;</a>
                  <ProductDetails details={this.props.details} />
                </div>
              </Popup>}

          </Card>}
      </div>


    )
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);