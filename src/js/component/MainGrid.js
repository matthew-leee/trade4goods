import React from 'react';
import { connect } from "react-redux";
import { Row, Col, } from 'antd';
// import MainCard from './MainCard'
import MainCard from './MainCardClone'
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { updateProducts } from '../actions/hello'
import actions_search from '../actions/search';
import actions_userPage from '../actions/userPage';
import BigOutCards from "./newUserPage/cards/BigOutCards"
import TradeCards from "./newUserPage/cards/TradeCards"

class ConnectedMainGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productsArr: [],
            filterArr: [],
            showArr: [],
            remainShowingBatch: 0,
            showingBatch: 0,
            hasmore: true,
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

    showMoreItems = (page) => {
        let copyState = { ...this.state }
        if (this.state.remainShowingBatch > this.state.showingBatch) {
            let newItemsArr = this.state.productsArr.slice(50 * this.state.showingBatch + 50, 50 * this.state.showingBatch + 100)
            copyState.showArr = [...this.state.showArr, ...newItemsArr]
            copyState.showingBatch = this.state.showingBatch + 1
            copyState.hasmore = true
            this.setState(copyState)
        }
        if (this.state.remainShowingBatch == page) {
            copyState.hasmore = false
            this.setState(copyState)
        }
    }


    componentDidMount = async () => {
        try {

            const res = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProducts/')
            res.data.forEach((u) => {
                u.openOneModal = false
                u.openOGModal = false
                u.openDELModal = false
                u.openMyGoodModal = false
            })
            this.props.storeAllProducts(res.data)
            if (this.props.searchArr.length === 0) {
                let shuffleArr = this.shuffleArray(res.data)
                this.props.updateProducts(shuffleArr)
                let remainShowingBatch = Math.floor(shuffleArr.length / 50)
                let showArr = shuffleArr.slice(0, 50)
                let copyState = { ...this.state }
                if (remainShowingBatch <= 1) {
                    copyState.hasmore = false
                } else {
                    copyState.hasmore = true
                }
                copyState.productsArr = shuffleArr
                copyState.showArr = showArr
                copyState.remainShowingBatch = remainShowingBatch
                this.setState(copyState)
                console.log(this.state.remainShowingBatch)
            } else {
                let filterArr = this.props.searchArr
                let remainShowingBatch = Math.floor(filterArr.length / 50)
                let showArr = filterArr.slice(0, 50)
                let copyState = { ...this.state }
                if (remainShowingBatch <= 1) {
                    copyState.hasmore = false
                } else {
                    copyState.hasmore = true
                }
                copyState.productsArr = filterArr
                copyState.showArr = showArr
                copyState.remainShowingBatch = remainShowingBatch
                this.props.updateProducts(res.data)
                this.setState(copyState)
            }


            const users = await Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/allProfile/')
            this.props.storeAllUsers(users.data)

        } catch (err) {
            console.log(err)
        }

    }


    componentWillReceiveProps(nextProps) {
        let filterArr = nextProps.searchArr
        let remainShowingBatch = Math.floor(filterArr.length / 50)
        let showArr = filterArr.slice(0, 50)
        let copyState = { ...this.state }
        if (remainShowingBatch <= 1) {
            copyState.hasmore = false
        } else {
            copyState.hasmore = true
        }
        copyState.productsArr = filterArr
        copyState.showArr = showArr
        copyState.remainShowingBatch = remainShowingBatch
        this.props.updateProducts(nextProps.searchArr)
        this.setState(copyState)
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
                <MainCard key={el.product_id} details={el} description={el.description} name={el.name} imgUrl={el.image[0]} />
            )
        })

        let c1 = cards.filter((el, i) => { return ((i + 1) % 6 === 1) })
        let c2 = cards.filter((el, i) => { return ((i + 1) % 6 === 2) })
        let c3 = cards.filter((el, i) => { return ((i + 1) % 6 === 3) })
        let c4 = cards.filter((el, i) => { return ((i + 1) % 6 === 4) })
        let c5 = cards.filter((el, i) => { return ((i + 1) % 6 === 5) })
        let c6 = cards.filter((el, i) => { return ((i + 1) % 6 === 0) })


        const {currentOutProduct, currentTrade} = this.props

        return (
            <div>
                {currentOutProduct.details && <BigOutCards />}
                {currentTrade.details && <TradeCards out={true} />}

                <Row type="flex" gutter={10}>

                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.showMoreItems.bind(this)}
                            hasMore={this.state.hasmore}
                            loader={loader} useWindow={true}>

                            {c1}

                        </InfiniteScroll>
                    </Col>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateProducts: arr => dispatch(updateProducts(arr)),
        storeAllProducts: (products) => {
            dispatch(actions_search.storeAllProducts(products))
        },
        storeAllUsers: (allUsers) => {
            dispatch(actions_userPage.storeAllUsers(allUsers))
        }
    };
}

const mapStateToProps = state => {
    const rooot = state.roootReducer
    const search = state.searchReducer
    const trade = state.tradeReducer
    return { 
        searchArr: rooot.searchArr, 
        productsArr: rooot.productsArr,
        currentOutProduct: search.currentOutProduct,
        currentTrade: trade.currentTrade,
        refresh: search.refresh,
        allProducts: search.allProducts
    };
};

const MainGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainGrid);

export default MainGrid;