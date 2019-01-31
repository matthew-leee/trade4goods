import React from 'react'
import { Link } from "react-router-dom";

class ErrAllInOne extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <div style={{textAlign: "center"}}> 
                    <p>{this.props.err}</p>
                    <buttun className="myBtn" onClick={this.props.rubyClose}> Return</buttun>
                </div>
        )

    }
}



export default ErrAllInOne;