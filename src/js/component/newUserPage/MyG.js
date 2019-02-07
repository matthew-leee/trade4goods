import React, { Component } from "react"
import { connect } from "react-redux"
import MyGCards from "./cards/MyGCards"
import MyGStyle from "./style/MyG"

import { Button } from "antd"
import actions_search from "../../actions/search";

const err = require('../asset/gif/replaceNoImg.gif')

class MyG extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: "all"
        }
    }

    componentDidMount = () => {
        this.props.setMyProducts(this.props.myUser.user_id);
    }

    handleFilter = (filter) => {
        this.props.setMyProducts(this.props.myUser.user_id);
        this.setState({
            filter: filter
        })
    }
    
    render() {
        const ButtonGroup = Button.Group;
        const allCards = this.props.myProducts
            .map((u) => {
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_MyGCards`}
                            traded={u.status == 3}
                            withR={u.offered_by.length > 0 && u.sold_to == null}
                            trading={u.status == 2}
                            nth={u.status == 1 && u.offered_by.length == 0}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const traded = this.props.myProducts
            .filter((u) => { return u.status == 3})
            .map((u) => {
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_MyGCards`}
                            traded={u.status == 3}
                            withR={u.offered_by.length > 0 && u.sold_to == null}
                            trading={u.status == 2}
                            nth={u.status == 1 && u.offered_by.length == 0}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const withR = this.props.myProducts
            .filter((u) => { return u.offered_by.length > 0 && u.sold_to == null })
            .map((u) => {
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_MyGCards`}
                            traded={u.status == 3}
                            withR={u.offered_by.length > 0 && u.sold_to == null}
                            trading={u.status == 2}
                            nth={u.status == 1 && u.offered_by.length == 0}
                            product_id={u.product_id}
                        />   
                    </div>
                )
            })
        const trading = this.props.myProducts
            .filter((u) => { return u.status == 2 && u.offered_by.length == 0 })
            .map((u) => {
                return (
                    <div style={{ margin: "1vw 1vw 1vw 1vw" }}>
                        <MyGCards
                            image={u.image[0] ? u.image[0] : err}
                            name={u.name}
                            key={`${u.product_id}_MyGCards`}
                            traded={u.status == 3}
                            withR={u.offered_by.length > 0 && u.sold_to == null}
                            trading={u.status == 2}
                            nth={u.status == 1 && u.offered_by.length == 0}
                            product_id={u.product_id}
                        />
                    </div>
                )
            })
        const filter = () => {

            switch (this.state.filter) {
                case "traded":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {traded}
                        </div>
                    )
                case "withR":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {withR}
                        </div>
                    )
                case "trading":
                    return (
                        <div className="contents" style={MyGStyle.outFrame.bigFrame}>
                            {trading}
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

        const handleSortProducts = (sort)=>{
            this.props.sortProducts(sort)
            filter()
        }

        return (
            <div className="MyG" style={{ padding: "2.5vw 2.5vw 2.5vw 2.5vw" }} style={MyGStyle.outFrame.superFrame}>
                <div className="buttons" style={MyGStyle.outFrame.button}>
                    <div className="content" style={{ display: "flex", flexDirection: "row" }}>
                        <div className="filter" style={{ display: "flex", flexDirection: "row", marginLeft: "1vw", marginRight: "1vw" }}>
                            <h6 style={{ paddingTop: "0.4vw", paddingBottom: 0, marginBottom: 0, marginRight: "0.4vw", color: "white" }}>Filter</h6>
                            <ButtonGroup>
                                <Button onClick={() => { this.handleFilter("all") }}>All</Button>
                                <Button onClick={() => { this.handleFilter("withR") }}>With Requests</Button>
                                <Button onClick={() => { this.handleFilter("trading") }}>Trading</Button>
                                <Button onClick={() => { this.handleFilter("traded") }}>Traded</Button>
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
        allProducts: search.allProducts,
        myProducts: search.myProducts,
        myUser: user.myUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMyProducts: (id) => {
            dispatch(actions_search.setMyProducts(id))
        },
        sortProducts: (sort) => {
            dispatch(actions_search.sortProducts(sort))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyG) 