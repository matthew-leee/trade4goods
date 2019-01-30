module.exports = class {
    constructor(knex) {
        this.knex = knex
    }

    async createNewChat(user1, user2) {
        try {
            let chat1 = await this.knex('chats').where('user_id1', user1).andWhere('user_id2', user2)
            chat1 = chat1[0]
            let chat2 = await this.knex('chats').where('user_id1', user2).andWhere('user_id2', user1)
            chat2 = chat2[0]
            if (chat1 || chat2) {
                throw {
                    statusCode: 400,
                    error: "Chatroom existed",
                    message: `Chatroom ${chat1.chat_id || chat2.chat_id} already exist, enter the chatroom directly`
                }
            }
            let exist = await this.knex('users').where('user_id', user2)
            exist = exist[0]
            if (!exist) {
                throw {
                    statusCode: 404,
                    error: "User not found",
                    message: `User ${user2} does not exist`
                }
            }
            const newChat = {
                user_id1: user1,
                user_id2: user2
            }
            await this.knex('chats').insert(newChat).returning('chat_id')
        } catch (err) {
            throw err
        }
    }

    async chat(user_id, chat_id, message) {
        try {
            let chat = await this.knex('chats').where('user_id1', user_id).orWhere('user_id2', user_id).andWhere('chat_id', chat_id)
            chat = chat[0]
            if (!chat) {
                throw {
                    statusCode: 403,
                    error: "Access Denied",
                    message: `User ${user_id} has no permission to access chatroom ${chat_id}`
                }
            }
            const messageInfo = {
                sent_by_user1: (chat.user_id1 === user_id),
                chat_message: message
            }
            await this.knex('messages').insert(messageInfo)
        } catch (err) {
            throw err
        }
    }

    async getChatList(user_id) {
        try {
            return await this.knex('chats').where('user_id1', user_id).orWhere('user_id2', user_id)
        } catch (err) {
            throw err
        }
    }

    async getChatMessages(user_id, chat_id) {
        try {
            let chat = await this.knex('chats').where('user_id1', user_id).orWhere('user_id2', user_id).andWhere('chat_id', chat_id)
            chat = chat[0]
            if (!chat) {
                throw {
                    statusCode: 403,
                    error: "Access Denied",
                    message: `User ${user_id} has no permission to access chatroom ${chat_id}`
                }
            }
            const messages = await this.knex('messages')
            return messages.filter(message => chat.messages.some(id => id === message.message_id))
        } catch (err) {
            throw err
        }
    }

    async deleteMessage(user_id, chat_id, message_id) {
        try {
            let chat = await this.knex('chats').where('user_id1', user_id).orWhere('user_id2', user_id).andWhere('chat_id', chat_id)
            chat = chat[0]
            if (!chat) {
                throw {
                    statusCode: 403,
                    error: "Access Denied",
                    message: `User ${user_id} has no permission to access chatroom ${chat_id}`
                }
            }
            let message = await this.knex('messages').where('message_id', message_id)
            message = message[0]
                (chat.user_id1 === user_id) ?
                message.del_by_user1 = true : message.del_by_user2 = true
            await this.knex('messages').where('message_id', message_id).update(message)
        } catch (err) {
            throw err
        }
    }
}