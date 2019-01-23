import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

class MainCard extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Card hoverable style={{ width: "100%" }} cover={<img alt="example" src={this.props.imgUrl} />}>
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        )


    }
}


export default MainCard;