'use strict';
const users = require('./users')
module.exports = class {
    constructor(axios, bcrypt, jwt, promisify, redisClient, knex) {
        this.axios = axios
        this.jwt = jwt
        this.bcrypt = bcrypt
        this.redisClient = redisClient
        this.smembersAsync = promisify(redisClient.smembers).bind(this.redisClient)
        this.sremAsync = promisify(redisClient.srem).bind(this.redisClient)
        this.knex = knex
    }

    async isAuthenticated(token) {
        try {
            const reply = await this.smembersAsync('jwt')
            const jwt = reply.find(element => element === token)
            return (jwt) ? this.jwt.decode(jwt) : null
        } catch (err) {
            throw err
        }
    }

    async signUp(incomingInfo) {
        try {
            const emailExist = await this.knex('users_credential').where('email', incomingInfo.email);
            // check for duplicated email and return error
            if (emailExist.length > 0) {
                const error = {
                    error: 'Duplicated Email',
                    message: `${incomingInfo.email} duplicates with account ${emailExist.username}`,
                }
                if (emailExist[0].email_isVerifying) {
                    error.message = 'This email is under verifying'
                    error.suggestSolution = 'Check your mailbox for verification email or request a new verification email'
                    throw error
                } else if (incomingInfo.facebook_id) {
                    error.suggestSolution = `Merge Facebook account with ${emailExist.username}`
                    throw error
                } else if (incomingInfo.google_id) {
                    error.suggestSolution = `Merge Google account with ${emailExist.username}`
                    throw error
                } else {
                    error.suggestSolution = `Login directly or choose forget passowrd`
                    throw error
                }
            }

            // check for duplicated username
            if (incomingInfo.facebook_id) {
                // add facebook user identifier to username
                incomingInfo.username = 'facebook_user_' + incomingInfo.name
            } else if (incomingInfo.google_id) {
                // add google user identifier to username
                incomingInfo.username = 'google_user_' + incomingInfo.name
            }
            const usernameExist = await this.knex('users_credential').where('email', incomingInfo.username);

            if (usernameExist.length > 0) {
                if (incomingInfo.google_id || incomingInfo.facebook_id) {
                    // if duplicates google or facebook username, add a number to the end of the username
                    let i = 0;
                    while (usernameExist.username === incomingInfo.username) {
                        if (incomingInfo.username + i !== usernameExist.usernameExist) {
                            incomingInfo.username + i
                        }
                    }
                } else {
                    throw {
                        error: 'Duplicated Username',
                        message: `${incomingInfo.username} duplicates with account ${usernameExist.username}`,
                        suggestSolution: `Signup with another username`
                    }
                }
            }

            // validate username and password if username do not sign up with facebook
            if (!incomingInfo.loginFacebook || !incomingInfo.loginGoogle) {
                if (incomingInfo.password !== incomingInfo.confirmed_password) {
                    throw {
                        error: 'Unmatched Password',
                        message: 'Password submitted does not match the confirmed password',
                        suggestSolution: `Recheck both of the informations being submitted`
                    }
                }

                if (incomingInfo.username.length < 5 || incomingInfo.username.length > 15 || /\W/.test(incomingInfo.username)) {
                    throw {
                        error: 'Invalid Username',
                        message: 'Username must be 5 to 15 characters long and contain no invalid character',
                        suggestSolution: 'rename the username'
                    }
                }

                if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(incomingInfo.email)) {
                    throw {
                        error: 'Invalid Email',
                        message: 'The email is invalid',
                        suggestSolution: 'check the email'
                    }
                }
            }
            delete incomingInfo.confirmed_password
            return await this.knex('users_credential').insert(incomingInfo).returning('login_id');
        } catch (err) {
            throw err
        }
    }

    login(username, password) {
        // find user from db
        const user = users.find(u => u.email === username && u.password === password);
        if (user) {
            const jwt = this.jwt.sign(user.id, process.env.JWT_SECRET)
            this.redisClient.sadd('jwt', jwt)
            return jwt
        } else {
            return null;
        }
    }

    async logout(token) {
        try {
            const reply = await this.sremAsync('jwt', token)
            console.log(reply)
        } catch (err) {
            throw (err)
        }
    }

    async loginFacebook(access_token) {
        try {
            const get = await this.axios.get(`https://graph.facebook.com/me?fields=email,name,picture&access_token=${access_token}`)
            const data = get.data
            data.access_token = access_token
            // find user from db
            const user = users.find(u => u.access_token === access_token)
            if (user) {
                const jwt = this.jwt.sign(user.id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                // push a new user into db
            }
        } catch (err) {
            throw err
        }
    }
}