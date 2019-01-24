import React, { Component } from "react"
import { Carousel, List, Avator, Icon, Row, Col } from "antd"


class ProductDetails extends Component {
    render() {
        const u = this.props.details
        const images = u.image.map((src) => {
            return (
                <img src={src} alt="" />
            )
        })
        const details = [
            {
                title: "Product Name",
                description: u.name,
            },
            {
                title: "Product Description",
                description: u.description,
            },
            {
                title: "Preferred Trade Location",
                description: `${u.trade_location[0]}, ${u.trade_location[1]}`,
            },
            {
                title: "Owner",
                description: u.uploaded_by,
            },
            {
                title: "Date of Upload",
                description: String(u.uploaded_at),
            },
            {
                title: "Status of Trade",
                description: u.status == 1 ? "Trading" : "Traded",
            }
        ]
        const comments = u.comments.map((a)=>{
            return {
                title: a.user,
                description: a.comment
            }
        })
        return (
            <div>
                <Row gutter={10}>
                    <Col span={8}>
                        <div className="imageCarosel">
                            <h2>{u.name}</h2>
                            <Carousel autoplay>
                                {images}
                            </Carousel>
                        </div>
                    </Col>
                    <Col span={8}>
                        <h4>Product Details</h4>
                        <div className="detailsList">
                            <List
                                itemLayout="vertical"
                                dataSource={details}
                                renderItem={item => (
                                    <List.Item key={u.product_id}>
                                        <List.Item.Meta
                                            title={<h5>{item.title}</h5>}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            >
                            </List>
                        </div>
                    </Col>
                
                
                    
                    <Col span={8}>
                        <h4>Comments</h4>
                        <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={item=>(
                            <List.Item key={`${u.product_id}comment`}>
                                <List.Item.Meta
                                    title={<h5>{item.title}</h5>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                        >

                        </List>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProductDetails