import React from 'react';
import { Row, Col, } from 'antd';
import MainCard from './MainCard'
import Axios from 'axios';





class MainGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productsArr: []
        }
    }
    componentDidMount() {
        Axios.get('https://localhost:8443/getallproductsplease')
            .then(res => {
                this.setState({ productsArr: res.data })
            })
    }

    shuffleArray(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    render() {

        // Seprate product into 6 rows
        let cards = this.state.productsArr.map((el) => {
            if (el.description.length > 135) {
                el.description = el.description.slice(0, 135) + " ....."
            }
            return (
                <MainCard description={el.description} name={el.name} imgUrl={el.image[0]} />
            )
        })
        let bb = this.shuffleArray(cards)
        let c1 = bb.filter((el, i) => { return ((i + 1) % 6 === 1) })
        let c2 = bb.filter((el, i) => { return ((i + 1) % 6 === 2) })
        let c3 = bb.filter((el, i) => { return ((i + 1) % 6 === 3) })
        let c4 = bb.filter((el, i) => { return ((i + 1) % 6 === 4) })
        let c5 = bb.filter((el, i) => { return ((i + 1) % 6 === 5) })
        let c6 = bb.filter((el, i) => { return ((i + 1) % 6 === 0) })




        return (
            <div>

                <Row type="flex" gutter={{ xs: 4, sm: 8, md: 16, lg: 16 }}>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c1}</Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c2}</Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c3}</Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c4}</Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c5}</Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c6}</Col>
                </Row>

            </div>
        )
    }
}


export default MainGrid;