import React, { Component } from "react"
import { Input } from "antd"
import { connect } from "react-redux";
import actions from "./actions"
import { Redirect } from "react-router-dom"
class Search extends Component {
    redirect = () => {
        if (this.props.submit) {
            return (
                <Redirect to="/userPage" />
            )
        }
    }
    render() {
        return (
            <div>
                {this.redirect()}
                    <input type="text" name="search" onChange={this.props.handleSearch} value={this.props.search} />
                    <button onClick={this.props.handleSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const search = state.searchReducers
    return {
        search: search.search,
        submit: search.submit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearch: (e) => {
            const search = e.target.value
            dispatch(actions.storeSearch(search))
        },
        handleSubmit: (e) =>{
            e.preventDefault();
            dispatch(actions.submitSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)