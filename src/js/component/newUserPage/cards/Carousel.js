import React, { Component } from "react"
import BigCardsStyle from "../style/BigCards"

const detail = BigCardsStyle.details

const err = require('../../asset/gif/replaceNoImg.gif')

class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: {
                src: ""
            }
        }
    }

    componentDidMount = () => {
        const src = this.props.srcs[0] ? this.props.srcs[0] : err
        this.setState({
            img: {
                src: src,
            }
        })
    }


    setCurrentImg = (src) => {
        this.setState({
            img: {
                src: src
            }
        })
    }

    render() {
        const allImg = this.props.srcs.length > 0 ? this.props.srcs.map((src) => {
            return (
                <div
                    className="allImgContainer"
                    onClick={() => { this.setCurrentImg(src) }}
                    style={detail.inner.allImgContainer}>
                    <img src={src} alt="" className="carouselSmall" 
                    style={{width: "7.5vh", height: "7.5vh", objectFit: "contain"}} />
                </div>
            )
        }) : () => {
            return (
                <div className="allImgContainer"
                    onClick={() => { this.setCurrentImg(err) }}
                    style={detail.inner.allImgContainer}
                >
                    <img src={err} alt="" className="carouselSmall"
                    style={{width: "7.5vh", height: "7.5vh", objectFit: "contain"}} />
                </div>
            )
        }

        return (
            <div className="fkcarousel" style={detail.inner.carousel}>
                <div className="currentImg" style={detail.inner.currentImg}>
                    <img src={this.state.img.src} alt="" className="carouselBig"
                    style={{width: "35vw", height: "60vh", objectFit:"contain"}} />
                </div>
                <div className="allImg" style={detail.inner.allImg}>
                    {allImg}
                </div>
            </div>
        )
    }
}

export default Carousel