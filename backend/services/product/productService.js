module.exports = class {
    constructor(knex, userProductService, commentService, nodemailer) {
        this.knex = knex
        this.toUser = userProductService
        this.commentService = commentService
        this.nodemailer = nodemailer
    }

    async uploadProduct(info, user_id) {
        if (typeof info.name !== 'string') {
            throw {
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Item Name"
            }
        }
        // if (!/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(info.image)) {
        //     throw {
        //         statusCode: 415,
        //         error: "Invalid Image Format",
        //         message: "Image has to be base64 encoded, this is probably an error at processing the image",
        //         suggestSolution: "Please skip uploading profile picture for now, contact us for help"
        //     }
        // }
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

            if (info.image) {
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
            } else if (originalInfo.status === 3) {
                throw {
                    statusCode: 403,
                    error: "Product sold",
                    message: "Product has been sold out and cannot be deleted"
                }
            } else {
                console.log("else")
                await this.knex('products').where('product_id', product_id).del()
                console.log("1await")
                await this.toUser.deleteProduct(product_id, user_id)
                console.log("2await")
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

    async getAllProducts() {
        try {
            return await this.knex('products')
        } catch (err) {
            throw err
        }
    }

    async offerProduct(product_offered, user_offering, product_offering) {
        try {
            product_offered = await this.knex('products').where('product_id', product_offered)
            product_offered = product_offered[0]
            // product_offering = await this.knex('products').where('product_id', product_offering).andWhere('uploaded_by', user_offering)
            product_offering = await this.knex('products').where('product_id', product_offering)
            product_offering = product_offering[0]
            if (!product_offering) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_offering} does not own product ${product_offering.product_id}`
                }
            } else if (!product_offered) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            } else if (product_offered.status >= 2) {
                throw {
                    statusCode: 400,
                    error: "Product is under trading",
                    message: `product ${product_offered.product_id} is under trading and cannot be offered`
                }
            } else if (product_offering.status >= 2) {
                throw {
                    statusCode: 400,
                    erorr: "Product is under trading",
                    message: `product ${product_offering.product_id} is under trading and cannot be offered`
                }
            } else {
                product_offered.offered_by.push(product_offering.product_id)
                await this.knex('products').where('product_id', product_offered.product_id).update(product_offered)
                product_offering.status = 2
                await this.knex('products').where('product_id', product_offering.product_id).update(product_offering)
                await this.nodemailer.sendOfferNotification(product_offered.product_id)
            }
        } catch (err) {
            console.log (err)
            throw err
        }
    }

    async cancelOfferProduct(product_offered, user_offering, product_offering) {
        try {
            product_offered = await this.knex('products').where('product_id', product_offered)
            product_offered = product_offered[0]
            product_offering = await this.knex('products').where('product_id', product_offering).andWhere('uploaded_by', user_offering)
            product_offering = product_offering[0]
            if (!product_offering) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_offering} does not own product ${product_offering.product_id}`
                }
            } else if (!product_offered) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            } else if (!product_offered.offered_by.find(e => e === product_offering.product_id)) {
                throw {
                    statusCode: 406,
                    error: "Product has not offer",
                    message: `product ${product_offering.product_id} did not offer on ${product_offered.product_id}`
                }
            } else {
                const deleteIndex = product_offered.offered_by.indexOf(product_offering.product_id)
                product_offered.offered_by.splice(deleteIndex, 1)
                await this.knex('products').where('product_id', product_offered.product_id).update(product_offered)
                product_offering.status = 1
                await this.knex('products').where('product_id', product_offering.product_id).update(product_offering)
            }
        } catch (err) {
            throw err
        }
    }

    async declineOffer(product_offered, user_offered, product_offering) {
        try {
            product_offered = await this.knex('products').where('product_id', product_offered).andWhere('uploaded_by', user_offered)
            product_offered = product_offered[0]
            product_offering = await this.knex('products').where('product_id', product_offering)
            product_offering = product_offering[0]
            if (!product_offering) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_offered} does not own product ${product_offering.product_id}`
                }
            } else if (!product_offered) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            } else if (!product_offered.offered_by.find(e => e === product_offering.product_id)) {
                throw {
                    statusCode: 406,
                    error: "Product has not offer",
                    message: `product ${product_offering.product_id} did not offer on ${product_offered.product_id}`
                }
            } else {
                const deleteIndex = product_offered.offered_by.indexOf(product_offering.product_id)
                product_offered.offered_by.splice(deleteIndex, 1)
                await this.knex('products').where('product_id', product_offered.product_id).update(product_offered)
                product_offering.status = 1
                await this.knex('products').where('product_id', product_offering.product_id).update(product_offering)
            }
        } catch (err) {
            throw err
        }
    }

    async addComment(product_id, user_id, comment) {
        try {
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            if (!product) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            }
            let comment_id = await this.commentService.addComment(user_id, comment, product_id);
            product.comments.push(comment_id)
            const ids = await this.knex('products').where('product_id', product.product_id).update(product).returning("comments")
            return ids
        } catch (err) {
            throw err
        }
    }

    // async getComment(product_id) {
        async getComment(comment_id) {
        try {
            // let product = await this.knex('products').where('product_id', product_id)
            let comment = await this.knex('product_comments').where('comment_id', comment_id)
            // product = product[0]
            if (!comment) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            }
            // return await commentService.getComment(product.comments)
            return comment
        } catch (err) {
            throw err
        }
    }

    async editComment(user_id, comment_id, commnet) {
        try {
            await this.commentService.editComment(user_id, comment_id, commnet)
        } catch (err) {
            throw err
        }
    }

    async deleteComment(user_id, comment_id) {
        try {
            const product_id = this.commentService.deleteComment(user_id, comment_id)
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            const delIndex = product.comments.indexOf(comment_id)
            product.comments.splice(delIndex, 1)
            await this.knex('products').where('product_id', product_id).update(product)
        } catch (err) {
            throw err
        }
    }

    async likeUnlikeProduct(user_id, product_id) {
        try {
            let product = await this.knex('products').where('product_id', product_id)
            product = product[0]
            if (!product) {
                throw {
                    statusCode: 404,
                    error: "Product not found",
                    message: `product ${product_offered.product_id} does not exists`
                }
            }
            if (product.liked_by.find(e => e === user_id)) {
                const delIndex = product.liked_by.indexOf(user_id)
                product.liked_by.splice(delIndex, 1)
                await this.toUser.unlikeProduct(user_id, product_id)
                await this.knex('products').where('product_id', product_id).update(product)
                return 'unliked'
            } else {
                product.liked_by.push(user_id)
                await this.toUser.likeProduct(user_id, product_id)
                await this.knex('products').where('product_id', product_id).update(product)
                return 'liked'
            }
        } catch (err) {
            throw err
        }
    }

    async acceptOffer(product_offered, product_owner, product_offering) {
        try {
            product_offered = await this.knex('products').where('product_id', product_offered).andWhere('uploaded_by', product_owner)
            
            product_offered = product_offered[0]
            product_offering = await this.knex('products').where('product_id', product_offering)
            product_offering = product_offering[0]
            if (!product_offered) {
                throw {
                    statusCode: 403,
                    error: "Product not belongs to user",
                    message: `user ${user_offering} does not own product ${product_offering.product_id}`
                }
            } else if (!product_offered.offered_by.find(e => e === product_offering.product_id)) {
                throw {
                    statusCode: 406,
                    error: "Product has not offer",
                    message: `product ${product_offering.product_id} did not offer on ${product_offered.product_id}`
                }
            } else {
                product_offered.status = 3
                product_offered.offered_by = []
                product_offering.offered_by = []
                product_offered.sold_to = product_offering.uploaded_by
                product_offering.status = 3
                const trade = {
                    product_id1: product_offered.product_id,
                    product_id2: product_offering.product_id
                }
                const trade_id = await this.knex('trade_history').insert(trade).returning('trade_id')
                await this.toUser.insertTradeHistory(trade_id, product_owner, product_offering.uploaded_by)
                await this.knex('products').where('product_id', product_offered.product_id).update(product_offered)
                await this.knex('products').where('product_id', product_offering.product_id).update(product_offering)
                await this.nodemailer.sendAcceptOfferNotification(product_offering.product_id)
            }
        } catch (err) {
            throw err
        }
    }

    async getHistory (id){
        try {
            const history = await this.knex('trade_history').where('trade_id', id)
            return history
        } catch(err) {
            console.log (err)
        }
    }
}