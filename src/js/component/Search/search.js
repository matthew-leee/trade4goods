import React, { Component } from "react"
import { connect } from "react-redux";
import actions_search from "../../actions/search"
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
    const search = state.searchReducer
    return {
        search: search.search,
        submit: search.submit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearch: (e) => {
            const search = e.target.value
            dispatch(actions_search.storeSearch(search))
        },
        handleSubmit: (e) =>{
            e.preventDefault();
            dispatch(actions_search.submitSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)