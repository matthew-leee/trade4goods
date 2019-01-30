import React from 'react';
import { Card, Icon, Avatar, Skeleton } from 'antd';
import { connect } from "react-redux"

import ProductDetails from "./UserPage/Details"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from './compCSS/popupCss'

import actions_userPage from "../actions/userPage"

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




  render() {
    console.log(this.props.details.profile_picture)
    const openOneModal = this.props.allProducts
      .filter((u) => {
        return u.product_id == this.props.details.product_id
      })[0].openOneModal
    return (
      <Card
        hoverable
        style={{ width: "100%", marginTop: "10px" }}
        cover={
          <img alt="example" src={this.state.imgPic} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }} />
        }
        actions={[<Icon type="heart" />, <Icon type="message" />, <Icon type="share-alt" />]} >

        <Skeleton loading={this.state.loading} title paragraph active>
          <Meta
            title={this.props.name}
            description={this.props.description}
            avatar={<Avatar src={this.props.details.profile_picture} />}
          />
        </Skeleton>

        {openOneModal &&
          <Popup open={true} closeOnDocumentClick onClose={() => { this.props.handleOneModal(this.props.details.product_id) }}>
            <div style={content} >
              <a style={popUpCloseTag} onClick={() => { this.props.handleOneModal(this.props.details.product_id) }}>&times;</a>
              <ProductDetails details={this.props.details} />
            </div>
          </Popup>}

      </Card>

    )
  }
}

const mapStateToProps = (state) => {
  const search = state.searchReducer
  return {
    allProducts: search.allProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOneModal: (id) => {
      dispatch(actions_userPage.openOneModal(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCard);