import React from 'react';
import { Row, Col, } from 'antd';
import MainCard from './MainCard'
const faker = require('faker');

//test case

let urlArr =[]
for (let i = 0; i <30; i++){
//faker.image.imageUrl()
    urlArr.push(faker.fake("{{image.image}}"))
}

class MainGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            urlArry: urlArr
        }
    }
    render() {
        let cards = this.state.urlArry.map((el)=>{
            return(
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard imgUrl={el}/></Col>
            )
        })
        return (
            <div>
                
                <Row gutter={{xs: 4, sm: 8, md: 16, lg: 16}}>
                    {cards}
                </Row>
            
            </div>
        )
    }
}


export default MainGrid;