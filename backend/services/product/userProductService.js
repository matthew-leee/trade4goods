module.exports = class {
    constructor(knex) {
        this.knex = knex
    }

    async uploadProduct(product_id, user_id) {
        try {
            console.log (user_id)
            let user = await this.knex('users').where('user_id', user_id)
            console.log (user)
            user = user[0]
            if (user.uploaded_products == null){
                user.uploaded_products = []
                console.log (user)
                user.uploaded_products.push(product_id)
                console.log (user)
            } else if (user.uploaded_products.length < 0) {
                user.uploaded_products.push(product_id)
            } else {
                console.log("invalid upload product")
            }
            await this.knex('users').where('user_id', user_id).update(user)
        } catch (err) {
            throw err
        }
    }

    async deleteProduct(product_id, user_id) {
        try {
            let user = await this.knex('users').where('user_id', user_id)
            user = user[0]
            user.uploaded_products = user.uploaded_products.filter(element => element !== product_id)
            await this.knex('users').where('user_id', user_id).update(user)
        } catch (err) {
            throw err
        }
    }

    async likeProduct(user_id, product_id) {
        try {
            let user = await this.knex('users').where('user_id', user_id)
            user = user[0]
            user.liked_products.push(product_id)
            await this.knex('users').where('user_id', user_id).update(user)
        } catch (err) {
            throw err
        }
    }

    async unlikeProduct(user_id, product_id) {
        try {
            let user = await this.knex('users').where('user_id', user_id)
            user = user[0]
            const delIndex = user.liked_products.indexOf(product_id)
            user.liked_products.splice(delIndex, 1)
            await this.knex('users').where('user_id', user_id).update(user)
        } catch (err) {
            throw err
        }
    }
}