import React, { Component } from "react"
import GeneralTags from "../../AddPhotos/tags_antd"
import { Card, Icon } from "antd"
import ProductDetails from "../Details"

import Popup from 'reactjs-popup'
import { popUpCloseTag, content } from '../../compCSS/popupCss'



class SentReqCard extends Component {
    render() {
        console.log(`this props : ${this.props.iconsArr}`)
        const { name, image, id, description, tags, handleContact, handleDelete, handleOneModal, openOneModal, allDetails, accepted, rejected } = this.props
        if (accepted) {
            return (
                <Card
                    style={{ width: "7vw" , backgroundColor: "red"}}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    actions={[
                        <Icon type="phone" onClick={handleContact} />
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                        description={description}
                    />
                    {/* <GeneralTags tags={tags} closable={false} /> */}

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
                    style={{ width: "7vw", backgroundColor: "blue" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    actions={[
                        <Icon type="delete" onClick={handleDelete} />
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                        description={description}
                    />
                    {/* <GeneralTags tags={tags} closable={false} /> */}

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
                    style={{ width: "7vw", backgroundColor: "green" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                        />
                    }
                    actions={[
                        <Icon type="delete" onClick={handleDelete} />
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                        description={description}
                    />
                    {/* <GeneralTags tags={tags} closable={false} /> */}

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