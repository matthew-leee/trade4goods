import React, { Component } from "react"
import MyGStyle from "../style/MyG"
import { Icon } from "antd"

class MyGCards extends Component {
    render() {
        const { image, name, key, traded, trading, withR, nth, product_id } = this.props

        return (
            <div className="MyGCard" style={MyGStyle.frame} key={key}>
                <div className="imgContainer" style={MyGStyle.img.container}>
                    {traded && <div className="imgFrame" style={MyGStyle.img.status.traded}></div>}
                    {trading && <div className="imgFrame" style={MyGStyle.img.status.trading}></div>}
                    {withR && <div className="imgFrame" style={MyGStyle.img.status.withR}></div>}
                    {nth && <div className="imgFrame" style={MyGStyle.img.frame}></div>}
                    <img src={image} alt="" style={MyGStyle.img.img} />
                </div>
                <div className="status" style={MyGStyle.status.container}>
                    <Icon type="edit" />
                    <p style={{ padding: 0, margin: 0 }}>{name}</p>
                </div>
            </div>
        )
    }
}

export default MyGCards