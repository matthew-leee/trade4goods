import React from 'react';
import { Row, Col, } from 'antd';
import MainCard from './MainCard'

class MainGrid extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div style={{marginTop: "10vh"}}>
                
                <Row gutter={{xs: 4, sm: 8, md: 16, lg: 16}}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} ><MainCard/></Col>
                

                </Row>
            
            </div>
        )


    }
}


export default MainGrid;