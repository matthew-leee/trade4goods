/* eslint-disable no-throw-literal */
module.exports = class {
    constructor(axios, bcrypt, jwt, promisify, redisClient, knex, nodemailer, randomstring, profileService) {
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
        this.createProfile = profileService.createProfile
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
                            statusCode: 400,
                            error: 'Duplicated Email',
                            message: `${incomingInfo.email} duplicates with account ${emailExist.username}, you are not allowed to login with this facebook account since email is duplicated`,
                        }
                    }
                    incomingInfo.username = 'facebook_user_' + incomingInfo.name
                    let usernameExist = await this.knex('users_credential').where('username', incomingInfo.username);
                    usernameExist = usernameExist[0]
                    if (usernameExist) {
                        let i = 0;
                        while (usernameExist.username === incomingInfo.username) {
                            if (incomingInfo.username + i !== usernameExist.usernameExist) {
                                incomingInfo.username = incomingInfo.username + i
                            }
                        }
                    }
                    incomingInfo = {
                        facebook_id: incomingInfo.facebook_id,
                        email: incomingInfo.email,
                        username: incomingInfo.username
                    }
                    let newId = await this.knex('users_credential').insert(incomingInfo).returning('user_id')  
                    newId = newId[0]


                    await this.knex('users_credential').where('user_id', newId).update({ email_isVerifying: false })
                    const jwt = this.jwt.sign(newId, process.env.JWT_SECRET)
                    this.redisClient.sadd('jwt', jwt)
                    return jwt
                }

                // ======================================== Google Signup Handle ========================================
                case (incomingInfo.hasOwnProperty('google_id')): {
                    if (emailExist) {
                        throw {
                            statusCode: 400,
                            error: 'Duplicated Email',
                            message: `${incomingInfo.email} duplicates with account ${emailExist.username}, you are not allowed to login with this google account since email is duplicated`,
                        }
                    }
                    incomingInfo.username = 'google_user_' + incomingInfo.name
                    let usernameExist = await this.knex('users_credential').where('username', incomingInfo.username);
                    usernameExist = usernameExist[0]
                    if (usernameExist) {
                        let i = 0;
                        while (usernameExist.username === incomingInfo.username) {
                            if (incomingInfo.username + i !== usernameExist.usernameExist) {
                                incomingInfo.username = incomingInfo.username + i
                            }
                        }
                    }

                    incomingInfo = { 
                        google_id: incomingInfo.google_id,
                        email: incomingInfo.email,
                        username: incomingInfo.username
                    }
                    let newId = await this.knex('users_credential').insert(incomingInfo).returning('user_id');
                    newId = newId[0]
                    await this.knex('users_credential').where('user_id', newId).update({ email_isVerifying: false })
                    const jwt = this.jwt.sign(newId, process.env.JWT_SECRET)
                    this.redisClient.sadd('jwt', jwt)
                    return jwt
                }
                // ======================================== Local SignUp Handle ========================================
                default: {
                    if (emailExist) {
                        if (emailExist.email_isVerifying) {
                            throw {
                                statusCode: 400,
                                error: 'Duplicated Email',
                                message: 'This email is under verifying',
                                suggestSolution: 'Check your mailbox for verification email or request a new verification email'
                            }
                        } else {
                            throw {
                                statusCode: 400,
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
                            statusCode: 400,
                            error: 'Duplicated Username',
                            message: `username ${incomingInfo.username} duplicated`,
                            suggestSolution: `Signup with another username`
                        }
                    }
                    if (incomingInfo.password !== incomingInfo.confirmed_password) {
                        throw {
                            statusCode: 422,
                            error: 'Unmatched Password',
                            message: 'Password submitted does not match the confirmed password',
                            suggestSolution: `Recheck both of the informations being submitted`
                        }
                    }

                    if (incomingInfo.username.length < 5 || incomingInfo.username.length > 15 || /\W/.test(incomingInfo.username)) {
                        throw {
                            statusCode: 422,
                            error: 'Invalid Username',
                            message: 'Username must be 5 to 15 characters long and contains no invalid character',
                            suggestSolution: 'rename the username'
                        }
                    }

                    if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(incomingInfo.email)) {
                        throw {
                            statusCode: 422,
                            error: 'Invalid Email',
                            message: `The email ${incomingInfo.email} is invalid`,
                            suggestSolution: 'check typo on email'
                        }
                    }

                    const hashedPassword = await this.bcrypt.hashPassword(incomingInfo.password);
                    const key = this.randomstring.generate();
                    this.redisClient.setex(key, 60 * 60 * 24, incomingInfo.email)
                    this.nodemailer.sendVerificationMail(incomingInfo.email, key)
                    const credential = {
                        username: incomingInfo.username,
                        password: hashedPassword,
                        email: incomingInfo.email
                    }

               
                    let newId = await this.knex('users_credential').insert(credential).returning('user_id');
                    newId = newId[0]
                   
                    const profile = {
                        displayed_name: incomingInfo.displayed_name,
                        phone_number: incomingInfo.phone_number,
                        profile_picture: incomingInfo.profile_picture
                    }
                    await this.createProfile(profile, newId) 
                    return newId
                }
            }
        } catch (err) {
            try{ 
            await this.knex('users_credential').where('email', incomingInfo.email).del();
            } catch(err) {
                throw err
            }
        }
    }

    async loginLocal(username, password) {
        try {
            let user = await this.knex('users_credential').where('username', username).orWhere('email', username)
            user = user[0]
            if (user && await this.bcrypt.checkPassword(password, user.password)) {
                // if (user.email_isVerifying) {
                //     throw {
                //         statusCode: 403,
                //         error: 'Unverified Email',
                //         message: `email has not been verified, please check your mailbox for verification email`,
                //     }
                // }
                const jwt = this.jwt.sign(user.user_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                throw {
                    statusCode: 401,
                    error: 'Incorrect Credential',
                    message: `Username or Password is not found`,
                }
            }
        } catch (err) {
            throw err
        }
    }

    async loginFacebook(facebook_id, access_token) {
        try {
            const get = await this.axios.get(`https://graph.facebook.com/me?fields=email,name&access_token=${access_token}`)
            const data = get.data
            if(!data.id || facebook_id !== data.id) {
                throw {
                    statusCode: 400,
                    error: 'Invalid Credential',
                    message: 'Access Token doesn\'t belong to the facebook user ID'
                }
            }
            let user = await this.knex('users_credential').where('facebook_id', facebook_id);
            user = user[0]
            if (user) {
                const jwt = this.jwt.sign(user.user_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
                if (!data.email) {
                    throw {
                        statusCode: 400,
                        error: 'Insufficient Credential',
                        message: 'An email was not found from your Facebook profile, an email address is needed for using this app, please consider signing up locally',
                        suggestSolution: 'Open up your email permission or sign up locally, if you think it is a bug, please report to us'
                    }
                }
                data.facebook_id = data.id
                delete data.id
                await this.signUp(data)
            }
        } catch (err) {
            throw err
        }
    }

    async loginGoogle(google_id, access_token, id_token) {
        try {
            let access_token_data = await this.axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`)
            access_token_data = access_token_data.data
            let id_token_data = await this.axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
            id_token_data = id_token_data.data 
            
            if(!access_token_data || !id_token_data || access_token_data.email !== id_token_data.email) {
                throw {
                    statusCode: 400,
                    error: 'Invalid Credential',
                    message: 'Access Token doesn\'t belong to the google user ID'
                }
            }
            let user = await this.knex('users_credential').where('google_id', google_id);
            user = user[0]
        
            if (user) {
                const jwt = this.jwt.sign(user.user_id, process.env.JWT_SECRET)
                this.redisClient.sadd('jwt', jwt)
                return jwt
            } else {
               
                if (!id_token_data.email) {
                    throw {
                        statusCode: 400,
                        error: 'Insufficient Credential',
                        message: 'An email was not found from your Google profile, an email address is needed for using this app, please consider signing up locally',
                        suggestSolution: 'Open up your email permission or sign up locally, if you think it is a bug, please report to us'
                    }
                }
                const data = {
                    google_id,
                    email: id_token_data.email,
                    name: id_token_data.name
                }
                await this.signUp(data)
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
            console.log(emailInKey)
            if (emailInKey) {
                await this.knex('users_credential').where('email', emailInKey).update({ email_isVerifying: false })
                this.redisClient.del(key)
            } else {
                throw {
                    statusCode: 403,
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
                    statusCode: 422,
                    error: 'Unmatched Password',
                    message: 'Password submitted does not match the confirmed password',
                    suggestSolution: `Recheck both of the informations being submitted`
                }
            }
            const email = await this.getAsync(key)
            if (!email) {
                throw {
                    statusCode: 403,
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