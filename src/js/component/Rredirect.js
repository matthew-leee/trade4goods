import React from 'react'

import { withRouter } from "react-router";






class Rredirect extends React.Component {





    componentDidMount(){

        this.props.history.push('/');

    }
    render() {
        return (
                <div  >
                   <h1>yes</h1>
                </div>
        )

    }
}



export default withRouter(Rredirect);