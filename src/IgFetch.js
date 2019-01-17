import React, { Component } from 'react';
import IgDisplay from  "./IgDisplay"

class IgFetch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ac: "",
            srcs: []
        }
    }

    handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log ("button clicked");
        console.log(this.state.ac)
        fetch(`http://localhost:8080/ig/${this.state.ac}`)
        .then((res)=>{
            console.log (res)
            return res.json()
        })
        .then((data)=>{
            console.log (data)
            const srcs = data.map((u)=>{return u.src})
            this.setState({
                ac: "",
                srcs: [...srcs]
            })
        })
        .catch(err=>console.log (err))
    }

    handleChange = (e) => {
        this.setState({
            ac: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input type="text" value={this.state.search} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                    <button onClick={this.handleClick} >Submit</button>
                </form>
                <IgDisplay srcs={this.state.srcs}/>
            </div>
        )
    }
}

export default IgFetch