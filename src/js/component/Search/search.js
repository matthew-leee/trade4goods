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
            <div className="input-group" style={{width:"30%"}}>
                {this.redirect()}
                <input onChange={this.props.handleSearch} value={this.props.search} type="text" className="form-control" placeholder="Search" aria-label="" aria-describedby="basic-addon1" />
                    <div className="input-group-append">
                        <button onClick={this.props.handleSubmit} className="btn btn-success" type="button"><svg viewBox="0 0 24 24" aria-label="Search" className="icon___2_Tkk icon___1OCig" color="#FFFFFF" style={{width:"20px",height:"20px"}}> <path d="M9.3061 18.6122C4.1665 18.6122 0 14.4458 0 9.3062 0 4.1664 4.1665 0 9.3061 0c5.1397 0 9.3061 4.1665 9.3061 9.3061 0 5.1397-4.1664 9.3061-9.306 9.3061zm0-.9795c4.5986 0 8.3266-3.728 8.3266-8.3266 0-4.5986-3.728-8.3265-8.3266-8.3265C4.7075.9796.9796 4.7076.9796 9.306c0 4.5986 3.728 8.3266 8.3265 8.3266zm6.021-1.6129a.4898.4898 0 1 1 .6927-.6927l7.8367 7.8368a.4898.4898 0 1 1-.6926.6926l-7.8368-7.8367z" fill="#FFFFFF" fillRule="nonzero"></path></svg></button>
                    </div>
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