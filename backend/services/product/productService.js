'use strict';
module.exports = class {
    constructor(knex, userProductService) {
        this.knex = knex
        this.toUser = userProductService
    }

    async uploadProduct(info, user_id) {
        if (typeof info.name !== 'string') {
            throw {
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Item Name"
            }
        }
        if (!/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(info.image)) {
            throw {
                statusCode: 415,
                error: "Invalid Image Format",
                message: "Image has to be base64 encoded, this is probably an error at processing the image",
                suggestSolution: "Please skip uploading profile picture for now, contact us for help"
            }
        }
        if (info.description && typeof info.description !== 'string') {
            throw {
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Description",
            }
        }
        if (info.expectation && typeof info.expectation !== 'string') {
            throw {
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Expected trade"
            }
        }
        if (info.trade_location && typeof info.trade_location !== 'string') {
            throw {
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Trade Location",
            }
        }
        if (info.tags) {
            if (!Array.isArray(info.tags) || info.tags.some(element => typeof element !== 'string'))
                throw {
                    statusCode: 422,
                    error: "Invalid Input",
                    message: "Unknown Error, Invalid Tags",
                }
        }
        const injectingInfo = {
            name: info.name,
            image: info.image,
            description: info.description,
            expectation: info.expectation,
            trade_location: info.trade_location,
            tags: info.tags,
            uploaded_by: user_id
        }
        try {
            let product_id = await this.knex('products').insert(injectingInfo).returning('product_id');
            product_id = product_id[0]
            this.toUser.uploadProduct(product_id, user_id)
        } catch (err) {
            throw err
        }
    }

    async editProduct(info, product_id, user_id) {
        let originalInfo = await this.knex('products').where('product_id', product_id).andWhere('uploaded_by', user_id)
        originalInfo = originalInfo[0]
        if (!originalInfo) {
            throw {
                statusCode: 403,
                error: "Product not belongs to user",
                message: `user ${user_id} does not own product ${product_id}`
            }
        } else {
            const injectingInfo = {}
            if (info.name && typeof info.name !== 'string') {
                throw {
                    statusCode: 422,
                    error: "Invalid Input",
                    message: "Unknown Error, Invalid Item Name"
                }
            } else if (info.name) {
                injectingInfo.name = info.name
            }

            if (info.image && !/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(info.image)) {
                throw {
                    statusCode: 415,
                    error: "Invalid Image Format",
                    message: "Image has to be base64 encoded, this is probably an error at processing the image",
                    suggestSolution: "Please skip uploading profile picture for now, contact us for help"
                }
            } else if (info.image) {
                injectingInfo.image = info.image
            }

            if (info.description && typeof info.description !== 'string') {
                throw {
                    statusCode: 422,
                    error: "Invalid Input",
                    message: "Unknown Error, Invalid Description",
                }
            } else if (info.description) {
                injectingInfo.description = info.description
            }
            if (info.trade_location && typeof info.trade_location !== 'string') {
                throw {
                    statusCode: 422,
                    error: "Invalid Input",
                    message: "Unknown Error, Invalid Trade Location",
                }
            } else if (info.trade_location) {
                injectingInfo.trade_location = info.trade_location
            }

            if (info.tags) {
                if (!Array.isArray(info.tags) || info.tags.some(element => typeof element !== 'string'))
                    throw {
                        statusCode: 422,
                        error: "Invalid Input",
                        message: "Unknown Error, Invalid Tags",
                    }
                injectingInfo.tags = info.tags
            }
            try {
                await this.knex('products').update(injectingInfo).where('product_id', product_id)
            } catch (err) {
                throw err
            }
        }
    }

    async deleteProduct(product_id, user_id) {
        try {
            let originalInfo = await this.knex('products').where('product_id', product_id).andWhere('uploaded_by', user_id)
            originalInfo = originalInfo[0]
            if (!originalInfo) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_id} does not own product ${product_id}`
                }
            } else {
                await this.knex('products').where('product_id', product_id).del()
                await this.toUser.deleteProduct(product_id, user_id)
            }
        } catch (err) {
            throw err
        }
    }

    async getProduct(product_id) {
        try {
            let info = await this.knex('products').where('product_id', product_id)
            info = info[0]
            if (!info) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_id} does not exists`
                }
            } else {
                return info
            }
        } catch (err) {
            throw err
        }
    }

    async offerProduct(product_id, user_id, offering_product) {
        try {
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            let offering = await this.knex('products').where('product_id', offering_product).andWhere('uploaded_by', user_id)
            offering = offering[0]
            if (!offering) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_id} does not own product ${product_id}`
                }
            } else if (!product) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_id} does not exists`
                }
            } else if (product.status >= 3) {
                throw {
                    statusCode: 400,
                    error: "Product is sold out",
                    message: `product ${product.product_id} is under trading and cannot be offered`
                }
            } else if (offering.status >= 3) {
                throw {
                    statusCode: 400,
                    erorr: "Product is under trading",
                    message: `product ${offering.product_id} is under trading and cannot be offered`
                }
            } else {
                const offer = {
                    status: 2
                }
                (product.offered_by) ?
                offer.offered_by = product.offered_by.push(offering.product_id) :
                offer.offered_by = [offering.product_id]
                await this.knex('products').where('product_id', product_id).update(offer)
            }
        } catch (err) {
            throw err
        }
    }
    /* TODO : 
    [x] upload product 
    [x] edit product
    [x] delete product
    [x] get product
    [] offer product
    [] comment on product
    [] delete comment on product
    [] like product
    [] dislike product
    [] confirm product trade

    product status: available, offered, trading, tradeout
    */
}