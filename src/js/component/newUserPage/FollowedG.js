import React, { Component } from "react"
import { connect } from "react-redux"
import { Button } from "antd"
import MyGCards from "./cards/MyGCards"

import actions_search from "../../actions/search";

import MyGStyle from "./style/MyG"
import FollowedGStyle from "./style/FollowedG";

const err = require('../asset/gif/replaceNoImg.gif')

class FollowedG extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: "all"
        }
    }

    componentDidMount = () => {
        this.props.setFProducts(this.props.myUser.user_id)
    }

    handleFilter = (filter) => {
        this.props.setFProducts(this.props.myUser.user_id);
        this.setState({
            filter: filter
        })
    }

    render() {
        const filter = () => {
            switch (this.state.filter) {
                case "a":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {aCards}
                        </div>
                    )
                case "na":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {naCards}
                        </div>
                    )
                case "requested":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {requestedCards}
                        </div>
                    )
                case "all":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {allCards}
                        </div>
                    )
                default:
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {allCards}
                        </div>
                    )
            }
        }
        const myProductArr = this.props.myUser.uploaded_products
        const allCards = this.props.fProducts
            .map((u) => {
                const offered = u.offered_by.some((offer) => {
                    return myProductArr.some((a) => {
                        return a == offer
                    })
                })
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_MyGCards`}
                            na={u.status > 1}
                            a={u.status == 1}
                            requested={offered}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const aCards = this.props.fProducts
            .filter((u) => { return u.status == 1 })
            .map((u) => {
                const offered = u.offered_by.some((offer) => {
                    return myProductArr.some((a) => {
                        return a == offer
                    })
                })
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_FollowedGCards`}
                            na={u.status > 1}
                            a={u.status == 1}
                            requested={offered}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const naCards = this.props.fProducts
            .filter((u) => { return u.status > 1 })
            .map((u) => {
                const offered = u.offered_by.some((offer) => {
                    return myProductArr.some((a) => {
                        return a == offer
                    })
                })
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_FollowedGCards`}
                            na={u.status > 1}
                            a={u.status == 1}
                            requested={offered}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const requestedCards = this.props.fProducts
            .filter((u) => {
                const offered = u.offered_by.some((offer) => {
                    return myProductArr.some((a) => {
                        return a == offer
                    })
                })
                return offered
            })
            .map((u) => {
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_FollowedGCards`}
                            na={u.status > 1}
                            a={u.status == 1}
                            requested={true}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })

        const handleSortProducts = (sort) => {
            this.props.sortFProducts(sort)
            filter()
        }
        const ButtonGroup = Button.Group
        return (
            <div className="FollowedG" style={{ padding: "2.5vw 2.5vw 2.5vw 2.5vw" }} style={MyGStyle.outFrame.superFrame}>
                <div className="buttons" style={FollowedGStyle.button}>
                    <div className="content" style={{ display: "flex", flexDirection: "row" }}>
                        <div className="filter" style={{ display: "flex", flexDirection: "row", marginLeft: "1vw", marginRight: "1vw" }}>
                            <h6 style={{ paddingTop: "0.4vw", paddingBottom: 0, marginBottom: 0, marginRight: "0.4vw", color: "white" }}>Filter</h6>
                            <ButtonGroup>
                                <Button onClick={() => { this.handleFilter("all") }}>All</Button>
                                <Button style={{backgroundColor: "rgba(200,0,0,0.5)", color: "white"}} onClick={() => { this.handleFilter("a") }}>Available</Button>
                                <Button style={{backgroundColor: "rgba(30,30,30,0.5)", color: "white"}} onClick={() => { this.handleFilter("na") }}>Not Available</Button>
                                <Button style={{backgroundColor: "#20639B", color: "white"}} onClick={() => { this.handleFilter("requested") }}>Requested</Button>
                            </ButtonGroup>
                        </div>
                        <div className="Order" style={{ display: "flex", flexDirection: "row", marginLeft: "1vw", marginRight: "1vw" }}>
                            <h6 style={{ paddingTop: "0.4vw", paddingBottom: 0, marginBottom: 0, marginRight: "0.4vw", color: "white" }}>Order</h6>
                            <ButtonGroup>
                                <Button onClick={() => { handleSortProducts("date") }}>Date of Upload</Button>
                                <Button onClick={() => { handleSortProducts("pop") }}>Popularity</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                </div>
                {filter()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const search = state.searchReducer
    const user = state.userReducer
    return {
        fProducts: search.fProducts,
        myUser: user.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFProducts: (id) => {
            dispatch(actions_search.setFProducts(id))
        },
        sortFProducts: (sort) => {
            dispatch(actions_search.sortFProducts(sort))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowedG)