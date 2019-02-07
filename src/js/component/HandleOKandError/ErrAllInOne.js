import React from 'react'
import { Link } from "react-router-dom";

class ErrAllInOne extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <div style={{textAlign: "center"}}> 
                    <p>Opps...Something goes wrong..</p>
                    <p>{this.props.err}</p>
                    <button className="myBtn" onClick={this.props.rubyClose}> Return</button>
                </div>
        )

    }
}



export default ErrAllInOne;