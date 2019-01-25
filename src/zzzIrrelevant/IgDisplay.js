import React, { Component } from 'react';

class IgDisplay extends Component {

    render(){
        const srcs = this.props.srcs
        const srcArr = srcs.map((u, i)=>{
            return (
                <div>
                    <p>displaying picture No.{i}</p>
                    <img src={u} alt=""/>
                </div>
            )
        })
        return(
            <div>
                {srcArr}
            </div>
        )
    }
}

export default IgDisplay