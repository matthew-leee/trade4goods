import React, { Component } from "react"
import GeneralTags from "../../AddPhotos/tags_antd"
import { Card, Icon } from "antd"
import ProductDetails from "../Details"

import Popup from 'reactjs-popup'
import { popUpCloseTag, content } from '../../compCSS/popupCss'



class SentReqCard extends Component {
    render() {
        console.log(`this props : ${this.props.iconsArr}`)
        const { name, image, id, handleDelete, handleOneModal, openOneModal, allDetails, accepted, rejected } = this.props
        if (accepted) {
            return (
                <Card
                    style={{ width: "7vw" , color: "red"}}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                    />

                    <p style={{marginTop: "0.5vw", marginBottom: 0}}><strong>Accepted</strong></p>

                    {openOneModal && <Popup open={true} closeOnDocumentClick onClose={() => { handleOneModal(id) }}>
                        <div style={content} >
                            <a style={popUpCloseTag} onClick={() => { handleOneModal(id) }}>&times;</a>
                            <ProductDetails details={allDetails} />
                        </div>
                    </Popup>}

                </Card>
            )
        } else if (rejected) {
            return (
                <Card
                    style={{ width: "7vw", color: "blue" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    actions={[
                        <Icon type="delete" onClick={()=>{handleDelete(id)}} />
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                    />
                    <p style={{marginTop: "0.5vw", marginBottom: 0}}><strong>Rejected</strong></p>

                    {openOneModal && <Popup open={true} closeOnDocumentClick onClose={() => { handleOneModal(id) }}>
                        <div style={content} >
                            <a style={popUpCloseTag} onClick={() => { handleOneModal(id) }}>&times;</a>
                            <ProductDetails details={allDetails} />
                        </div>
                    </Popup>}

                </Card>
            )
        } else {
            return (
                <Card
                    style={{ width: "7vw", color: "green" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    actions={[
                        <Icon type="delete" onClick={()=>{handleDelete(id)}}  />
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                    />
                    <p style={{marginTop: "0.5vw", marginBottom: 0}}><strong>Trading in Progress</strong></p>

                    {openOneModal && <Popup open={true} closeOnDocumentClick onClose={() => { handleOneModal(id) }}>
                        <div style={content} >
                            <a style={popUpCloseTag} onClick={() => { handleOneModal(id) }}>&times;</a>
                            <ProductDetails details={allDetails} />
                        </div>
                    </Popup>}

                </Card>
            )
        }
    }
}

export default SentReqCard