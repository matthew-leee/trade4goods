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
            searchArr: this.props.searchArr
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
        let copyState = { ...this.props.copyState }
        if (this.state.remainShowingBatch > this.state.showingBatch) {
            let newItemsArr = this.state.productsArr.slice(50 * this.state.showingBatch + 50, 50 * this.state.showingBatch + 100)
            copyState.showArr = [...this.state.showArr, ...newItemsArr]
            copyState.showingBatch = this.state.showingBatch + 1
            copyState.hasmore = true
            this.props.setCopyState(copyState)
        }
        if (this.state.remainShowingBatch == page) {
            copyState.hasmore = false
            this.props.setCopyState(copyState)
        }
    }


    componentDidMount = async () => {
        try {
            const res = await Axios.get('https://localhost:8443/api/allProducts/')
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
                // let copyState = { ...this.state }
                let copyState = { ...this.props.copyState }
                if (remainShowingBatch <= 1) {
                    copyState.hasmore = false
                } else {
                    copyState.hasmore = true
                }
                copyState.productsArr = shuffleArr
                copyState.showArr = showArr
                copyState.remainShowingBatch = remainShowingBatch
                // this.setState(copyState)
                this.props.setCopyState(copyState)
            } else {
                let filterArr = this.props.searchArr
                let remainShowingBatch = Math.floor(filterArr.length / 50)
                let showArr = filterArr.slice(0, 50)
                // let copyState = { ...this.state }
                let copyState = { ...this.props.copyState }
                if (remainShowingBatch <= 1) {
                    copyState.hasmore = false
                } else {
                    copyState.hasmore = true
                }
                copyState.productsArr = filterArr
                copyState.showArr = showArr
                copyState.remainShowingBatch = remainShowingBatch
                // this.setState(copyState)
                this.props.setCopyState(copyState)
            }


            const users = await Axios.get('https://localhost:8443/api/allProfile/')
            this.props.storeAllUsers(users.data)

        } catch (err) {
            console.log(err)
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     let filterArr = nextProps.searchArr
    //     let remainShowingBatch = Math.floor(filterArr.length / 50)
    //     let showArr = filterArr.slice(0, 50)
    //     // let copyState = { ...this.state }
    //     let copyState = this.props.copyState
    //     if (remainShowingBatch <= 1) {
    //         copyState.hasmore = false
    //     } else {
    //         copyState.hasmore = true
    //     }
    //     copyState.productsArr = filterArr
    //     copyState.showArr = showArr
    //     copyState.remainShowingBatch = remainShowingBatch
    //     // this.setState(copyState)
    //     this.props.setCopyState(copyState)
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.searchArr !== prevState.searchArr) {
            return { searchArr: nextProps.searchArr };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchArr !== this.state.searchArr) {
            let filterArr = this.state.searchArr
            let remainShowingBatch = Math.floor(filterArr.length / 50)
            let showArr = filterArr.slice(0, 50)
            // let copyState = { ...this.state }
            let copyState = {...this.props.copyState}
            if (remainShowingBatch <= 1) {
                copyState.hasmore = false
            } else {
                copyState.hasmore = true
            }
            copyState.productsArr = filterArr
            copyState.showArr = showArr
            copyState.remainShowingBatch = remainShowingBatch
            // this.setState(copyState)
            console.log ("happy")
            this.props.setCopyState(copyState)
        }
    }

    render() {

        const { currentOutProduct, currentTrade, copyState } = this.props

        // infinite scrolling bottom div
        const loader = <div style={{ width: "100%", textAlign: "center" }} key={0}><img alt="isLoading" src={require('./asset/gif/mainPageLoadingPic.gif')}></img></div>;

        // Seprate product into 6 rows
        // let cards = this.state.showArr.map((el) => {
        let cards = copyState.showArr.map((el) => {
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

        return (
            <div>
                {currentOutProduct.details && <BigOutCards />}
                {currentTrade.details && <TradeCards out={true} />}

                <Row type="flex" gutter={10}>

                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.showMoreItems.bind(this)}
                            hasMore={copyState.hasmore}
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
        },
        setCopyState: (copyState) => {
            dispatch(actions_search.setCopyState(copyState))
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
        copyState: search.copyState,
        currentOutProduct: search.currentOutProduct,
        currentTrade: trade.currentTrade
    };
};

const MainGrid = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainGrid);

export default MainGrid;