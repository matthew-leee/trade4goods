module.exports = class {
    constructor(knex) {
        this.knex = knex
    }

    async comment(user_id, comment, product_id) {
        try {
            const commentInfo = {
                commentator: user_id,
                comment,
                comment_in_product: product_id
            }
            return await this.knex('product_comments').insert(commentInfo).returning('comment_id');
        } catch (err) {
            throw err
        }
    }

    async getComment(comments_id) {
        try {
            const comments = await this.knex('product_comments')
            return comments.filter(comment => comments_id.some(id => id === comment.id));
        } catch(err) {
            throw err
        }
    }

    async editComment(user_id, comment_id, comment) {
        let comment = await this.knex('product_comments').where('comment_id', comment_id).andWhere('commentator', user_id)
        comment = comment[0]
        if (!comment) {
            throw {
                statusCode: 403,
                error: `user ${user_id} has no permission to delete comment ${comment_id}`
            }
        } else {
            comment.comment = comment
            await this.knex('product_comments').where('comment_id', comment_id).andWhere('commentator', user_id).update(comment)
        }
    }

    async deleteComment(user_id, comment_id) {
        try {
            let comment = await this.knex('product_comments').where('comment_id', comment_id).andWhere('commentator', user_id)
            comment = comment[0]
            if (!comment) {
                throw {
                    statusCode: 403,
                    error: `user ${user_id} has no permission to delete comment ${comment_id}`
                }
            } else {
                await this.knex('product_comments').where('comment_id', comment_id).andWhere('commentator', user_id).del()
            }
            return comment.comment_in_product
        } catch (err) {
            throw err
        }
    }
}