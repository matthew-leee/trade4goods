import React from 'react';
import { Card, Icon } from 'antd';
const { Meta } = Card;

class MainCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
          }
        
    }
    render() {
        return (
            <Card hoverable style={{ width: "100%", flexDirection: "column" }} cover={<img alt="example" src={this.props.imgUrl} />} 
            actions={[<Icon type="heart" />, <Icon type="message" />, <Icon type="share-alt" />]} >
                <Meta title={this.props.name} description={this.props.description} />
            </Card>
        )


    }
}


export default MainCard;