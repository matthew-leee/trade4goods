'use strict';
module.exports = class {
    constructor(axios, bcrypt, jwt, promisify, redisClient, knex, nodemailer, randomstring) {
        this.axios = axios
        this.jwt = jwt
        this.bcrypt = bcrypt
        this.redisClient = redisClient
        this.smembersAsync = promisify(redisClient.smembers).bind(this.redisClient)
        this.sremAsync = promisify(redisClient.srem).bind(this.redisClient)
        this.getAsync = promisify(redisClient.get).bind(this.redisClient)
        this.knex = knex
        this.nodemailer = nodemailer
        this.randomstring = randomstring
    }

    async isAuthenticated(token) {
        try {
            const reply = await this.smembersAsync('jwt')
            const match = reply.find(element => element === token)
            return (match) ? Number.parseInt(await this.jwt.decode(match)) : false
        } catch (err) {
            throw err
        }
    }

    async signUp(incomingInfo) {
        try {
            let emailExist = await this.knex('users_credential').where('email', incomingInfo.email);
            emailExist = emailExist[0]

            switch (true) {
                // ======================================== Facebook Signup Handle ========================================
                case (incomingInfo.hasOwnProperty('facebook_id')): {
                    if (emailExist) {
                        throw {
                            error: 'Duplicated Email',
                            message: `${incomingInfo.email} duplicates with account ${emailExist.username}`,
                            suggestSolution: `Merge Facebook account with ${emailExist.username}`
                        }
                    }
                    incomingInfo.username = 'facebook_user_' + incomingInfo.name
                    let usernameExist = await this.knex('users_credential').where('username', incomingInfo.username);
                    usernameExist = usernameExist[0]
                    if (usernameExist) {
                        let i = 0;
                        while (usernameExist.username === incomingInfo.username) {
                            if (incomingInfo.username + i !== usernameExist.usernameExist) {
                                incomingInfo.username + i
                            }
                        }
                    }
                    incomingInfo = {
                        facebook_id: incomingInfo.facebook_id,
                        email: incomingInfo.email,
                        access_token: incomingInfo.access_token,
                        username: incomingInfo.username
                    }
                    let newId = await this.knex('users_credential').insert(incomingInfo).returning('login_id');
                    newId = newId[0]
                    await this.knex('users_credential').where('login_id', newId).update({ email_isVerifying: false })
                    return this.loginFacebook(incomingInfo.access_token)
                }

                // ======================================== Google Signup Handle ========================================
                case (incomingInfo.hasOwnProperty('google_id')): {
                    if (emailExist) {
                        throw {
                            error: 'Duplicated Email',
                            message: `${incomingInfo.email} duplicates with account ${emailExist.username}`,
                            suggestSolution: `Merge Google account with ${emailExist.username}`
                        }
                    }
                    incomingInfo.username = 'google_user_' + incomingInfo.name
                    let usernameExist = await this.knex('users_credential').where('username', incomingInfo.username);
                    usernameExist = usernameExist[0]
                    if (usernameExist) {
                        let i = 0;
                        while (usernameExist.username === incomingInfo.username) {
                            if (incomingInfo.username + i !== usernameExist.usernameExist) {
                                incomingInfo.username + i
                            }
                        }
                    }
                    incomingInfo = {
                        google_id: incomingInfo.google_id,
                        email: incomingInfo.email,
                        access_token: incomingInfo.access_token,
                        username: incomingInfo.username
                    }
                    let newId = await this.knex('users_credential').insert(incomingInfo).returning('login_id');
                    newId = newId[0]
                    await this.knex('users_credential').where('login_id', newId).update({ email_isVerifying: false })
                    return this.loginGoogle(incomingInfo.access_token)
                }
                // ======================================== Local SignUp Handle ========================================
                default: {
                    if (emailExist) {
                        if (emailExist.email_isVerifying) {
                            throw {
                                error: 'Duplicated Email',
                                message: 'This email is under verifying',
                                suggestSolution: 'Check your mailbox for verification email or request a new verification email'
                            }
                        } else {
                            throw {
                                error: 'Duplicated Email',
                                message: `${incomingInfo.email} duplicates with account ${emailExist.username}`,
                                suggestSolution: 'Login directly or choose forget passowrd'
                            }
                        }
                    }
                    let usernameExist = await this.knex('users_credential').where('username', incomingInfo.username);
                    usernameExist = usernameExist[0]
                    if (usernameExist) {
                        throw {
                            error: 'Duplicated Username',
                            message: `username ${incomingInfo.username} duplicated`,
                            suggestSolution: `Signup with another username`
                        }
                    }
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
                            message: 'Username must be 5 to 15 characters long and contains no invalid character',
                            suggestSolution: 'rename the username'
                        }
                    }

                    if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(incomingInfo.email)) {
                        throw {
                            error: 'Invalid Email',
                            message: `The email ${incomingInfo.email} is invalid`,
                            suggestSolution: 'check typo on email'
                        }
                    }
                    delete incomingInfo.confirmed_password
                    const hashedPassword = await this.bcrypt.hashPassword(incomingInfo.password);
                    incomingInfo.password = hashedPassword;
                    const key = this.randomstring.generate();
                    this.redisClient.setex(key, 60 * 60 * 24, incomingInfo.email)
                    this.nodemailer.sendVerificationMail(incomingInfo.email, key)
                    let newId = await this.knex('users_credential').insert(incomingInfo).returning('login_id');
                    newId = newId[0]
                    return newId
                }
            }
        } catch (err) {
            throw err
        }
    }

    async loginLocal(username, password) {
        try {
            let user = await this.knex('users_credential').where('username', username).orWhere('email', username)
            user = user[0]
            if (user) {
                await this.bcrypt.checkPassword(password, user.password)
                const jwt = this.jwt.sign(user.login_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                throw {
                    error: 'Incorrect Credential',
                    message: `username or password is not found`,
                }
            }
        } catch (err) {
            throw err
        }
    }

    async loginFacebook(access_token) {
        try {
            let user = await this.knex('users_credential').where('access_token', access_token);
            user = user[0]
            if (user) {
                const jwt = this.jwt.sign(user.login_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                const get = await this.axios.get(`https://graph.facebook.com/me?fields=email,name&access_token=${access_token}`)
                const data = get.data
                data.access_token = access_token
                if (!data.email) {
                    throw {
                        error: 'Insufficient Credential',
                        message: 'An email was not found from your Facebook profile, an email address is needed for using this app, please consider signing up locally',
                        suggestSolution: 'Open up your email permission or sign up locally, if you think it is a bug, please report to us'
                    }
                }
                this.signUp(get.data)
            }
        } catch (err) {
            throw err
        }
    }

    async loginGoogle(access_token, id_token) {
        try {
            let user = await this.knex('users_credential').where('access_token', access_token);
            user = user[0]
            if (user) {
                const jwt = this.jwt.sign(user.login_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                const get = await this.axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
                const data = get.data
                data.access_token = access_token
                if (!data.email) {
                    throw {
                        error: 'Insufficient Credential',
                        message: 'An email was not found from your Google profile, an email address is needed for using this app, please consider signing up locally',
                        suggestSolution: 'Open up your email permission or sign up locally, if you think it is a bug, please report to us'
                    }
                }
                this.signUp(get.data)
            }
        } catch (err) {
            throw err
        }
    }

    async logout(token) {
        try {
            return await this.sremAsync('jwt', token)
        } catch (err) {
            throw (err)
        }
    }

    async verifyEmail(key) {
        try {
            const emailInKey = await this.getAsync(key)
            if (emailInKey) {
                await this.knex('users_credential').where('email', emailInKey).update({ email_isVerifying: false })
                this.redisClient.del(key)
            } else {
                throw {
                    error: 'Expired Key',
                    message: 'The key has been expired or invalid'
                }
            }
        } catch (err) {
            throw err
        }
    }

    async requestPasswordRequest(email) {
        try {
            const resetKey = this.randomstring.generate();
            let exist = await this.knex('users_credential').where('email', email).andWhere('email_isVerifying', false);
            if (exist.length > 0) {
                this.redisClient.setex(`${resetKey}`, 60 * 60 * 24, email);
                this.nodemailer.sendPasswordResetMail(email, resetKey);
            }
        } catch (err) {
            throw err
        }
    }

    async resetPassword(password, confirmed_password, key) {
        try {
            if (password !== confirmed_password) {
                throw {
                    error: 'Unmatched Password',
                    message: 'Password submitted does not match the confirmed password',
                    suggestSolution: `Recheck both of the informations being submitted`
                }
            }
            const email = await this.getAsync(key)
            if (!email) {
                throw {
                    error: 'Expired Key',
                    message: 'The key has been expired or invalid',
                    suggestSolution: 'Request for another password reset email'
                }
            }
            const hash = await this.bcrypt.hashPassword(password);
            await this.knex('users_credential').where('email', email).update('password', hash)
            this.redisClient.del(key)
        } catch (err) {
            throw err
        }
    }
}