import React, { Component } from "react"
import GeneralTags from "../../AddPhotos/tags_antd"
import { Card, Icon } from "antd"
import ProductDetails from "../Details"

import Popup from 'reactjs-popup'   //npm Reactjs-Popup
import { popUpCloseTag, content } from '../../compCSS/popupCss'

class MyGoodsCard extends Component {
    render() {
        console.log(`this props : ${this.props.iconsArr}`)
        const { trade, name, image, id, description, tags, handleSelect, handleEdit, handleDelete, handleOneModal, openOneModal, allDetails } = this.props
        if (trade) {
            return (
                <Card
                    style={{ width: "7vw" }}
                    cover={
                        <img
                            alt={name}
                            src={image}
                            onClick={() => { handleSelect(id) }}
                            style={{ width: "7vw", height: "7vw" }}
                        />
                    }
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                        description={description}
                    />

                </Card>
            )
        } else {
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
                        <Icon type="edit" onClick={handleEdit} />,
                        <Icon type="delete" onClick={handleDelete} />,
                    ]}
                    key={id}
                    id={id}
                >
                    <Card.Meta
                        title={name}
                        description={description}
                    />

                    <GeneralTags tags={tags} closable={false} />

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

export default MyGoodsCard