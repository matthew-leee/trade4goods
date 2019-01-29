import React from 'react';
import { connect } from "react-redux";
import { Row, Col, } from 'antd';
import MainCard from './MainCard'
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { updateProducts } from '../actions/hello'

function mapDispatchToProps(dispatch) {
    return {
        updateProducts: arr => dispatch(updateProducts(arr)),

    };
}

const mapStateToProps = state => {
    const search = state.roootReducer
    return { searchArr: search.searchArr, productsArr: search.productsArr };
};


class ConnectedMainGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productsArr: [],
            filterArr: [],
            showArr: [],
            remainShowingBatch: 0,
            showingBatch: 0,
            hasmore: true
        }
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

    componentDidMount() {
        Axios.get('https://localhost:8443/api/allProducts/')
            .then(res => {
                if (this.props.searchArr.length === 0) {
                    let shuffleArr = this.shuffleArray(res.data)
                    this.props.updateProducts(shuffleArr)
                    let remainShowingBatch = Math.floor(shuffleArr.length / 50)
                    let showArr = shuffleArr.slice(0, 50)
                    let copyState = { ...this.state }
                    copyState.productsArr = shuffleArr
                    copyState.showArr = showArr
                    copyState.remainShowingBatch = remainShowingBatch
                    this.setState(copyState)
                } else {
                    let filterArr = this.props.searchArr
                    let remainShowingBatch = Math.floor(filterArr.length / 50)
                    let showArr = filterArr.slice(0, 50)
                    let copyState = { ...this.state }
                    copyState.productsArr = filterArr
                    copyState.showArr = showArr
                    copyState.remainShowingBatch = remainShowingBatch
                    this.setState(copyState)
                }
            })
    }


    componentWillReceiveProps(nextProps) {
        let filterArr = nextProps.searchArr
        let remainShowingBatch = Math.floor(filterArr.length / 50)
        let showArr = filterArr.slice(0, 50)
        let copyState = { ...this.state }
        if(remainShowingBatch  == 1){
            copyState.hasmore = false
        }else{
            copyState.hasmore = true
        }
        copyState.productsArr = filterArr
        copyState.showArr = showArr
        copyState.remainShowingBatch = remainShowingBatch
        this.setState(copyState)
    }

    showMoreItems(page) {
        let copyState = { ...this.state }
        if (this.state.remainShowingBatch > this.state.showingBatch) {
            let newItemsArr = this.state.productsArr.slice(50 * this.state.showingBatch + 50, 50 * this.state.showingBatch + 100)
            copyState.showArr = [...this.state.showArr, ...newItemsArr]
            copyState.showingBatch = this.state.showingBatch + 1
            copyState.hasmore = true
            this.setState(copyState)
            console.log(page)
        }
        if (this.state.remainShowingBatch == page) {
            copyState.hasmore = false
            this.setState(copyState)
        }
    }




    render() {

        // infinite scrolling bottom div
        const loader = <div style={{ width: "100%", textAlign: "center" }} key={0}><img alt="isLoading" src={require('./asset/gif/mainPageLoadingPic.gif')}></img></div>;

        // Seprate product into 6 rows
        let cards = this.state.showArr.map((el) => {
            if (el.description.length > 135) {
                el.description = el.description.slice(0, 135) + " ....."
            }
            return (
                <MainCard key={el.product_id} description={el.description} name={el.name} imgUrl={el.image[0]} />
            )
        })

        let c1 = cards.filter((el, i) => { return ((i + 1) % 6 === 1) })
        let c2 = cards.filter((el, i) => { return ((i + 1) % 6 === 2) })
        let c3 = cards.filter((el, i) => { return ((i + 1) % 6 === 3) })
        let c4 = cards.filter((el, i) => { return ((i + 1) % 6 === 4) })
        let c5 = cards.filter((el, i) => { return ((i + 1) % 6 === 5) })
        let c6 = cards.filter((el, i) => { return ((i + 1) % 6 === 0) })




        return (
            <div>

                <Row type="flex" gutter={10}>



                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.showMoreItems.bind(this)}
                        hasMore={this.state.hasmore}
                        loader={loader} useWindow={true}>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4}>{c1}</Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c2}</Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c3}</Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c4}</Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c5}</Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} >{c6}</Col>

                    </InfiniteScroll>


                </Row>
            </div>
        )
    }
}


const MainGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainGrid);

export default MainGrid;