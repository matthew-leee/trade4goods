import React from 'react';
import { Card, Icon,Avatar,Skeleton  } from 'antd';
const { Meta } = Card;

class MainCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error:false,
            imgPic: require('./asset/gif/loadingpic.gif')
          }
        
    }
    componentDidMount() {
        const img = new Image();
        img.src = this.props.imgUrl;
        img.onload = () => {
          this.setState({
            loading: false,
            imgPic: img.src
          });
        };
        img.onerror = () => {
          this.setState({
            loading: false,
            error: true,
            imgPic: require('./asset/gif/error404.gif')
          });
        };
      }


    render() {

        return (
            <Card hoverable style={{ width: "100%", marginTop:"10px"}} cover={<img alt="example" src={this.state.imgPic} />} 
            actions={[<Icon type="heart" />, <Icon type="message" />, <Icon type="share-alt" />]} >
            <Skeleton loading={this.state.loading}   title paragraph active>
                <Meta title={this.props.name} description={this.props.description} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}/>
            </Skeleton>
            </Card>
        )
    }
}


export default MainCard;