import React, { Component } from "react"
import GeneralTags from "../../AddPhotos/tags_antd"
import { Card, Icon } from "antd"
import ProductDetails from "../Details"

import Popup from 'reactjs-popup'
import { popUpCloseTag, content } from '../../compCSS/popupCss'



class ReceivedReqCard extends Component {
    render() {
        console.log(`this props : ${this.props.iconsArr}`)
        const { name, image, id, description, tags, handleAccept, handleDecline, handleOneModal, openOneModal, allDetails } = this.props
        
            return (
                <Card
                    style={{ width: "7vw" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleOneModal(id) }}
                            style={{ width: "7vw", height: "7vw" }}
                        />
                    }
                    actions={[
                        <Icon type="check" onClick={handleAccept} />,
                        <Icon type="close" onClick={handleDecline} />
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

export default ReceivedReqCard