const
    axios = require('axios'),
    bcrypt = require('bcrypt'),
    Bcrypt = require('../services/auth/bcrypt'),
    jwt = require('jsonwebtoken'),
    { promisify } = require('util'),
    env = require('./config/env'),
    redis = require('redis'),
    randomstring = require('randomstring'),
    redisClient = require('../init/init-redis')(redis),
    knex = require('knex')({
        client: 'postgresql',
        connection: {
            database: env.DB_NAME,
            user: env.DB_USERNAME,
            password: env.DB_PASSWORD,
        }
    }),
    NodeMailer = {
        sendVerificationMail: jest.fn(),
        sendPasswordResetMail: jest.fn()
    },
    AuthService = require('../services/auth/authService')


describe('AuthService', () => {
    let authService
    beforeEach(() => {
        authService = new AuthService(axios, new Bcrypt(bcrypt), jwt, promisify, redisClient, knex, NodeMailer, randomstring)
    })

    afterAll(() => {
        redisClient.end(true);
        knex.destroy();
    })

    test('should successfully sign up a user with correct information on local signup', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        expect(id).toBeGreaterThanOrEqual(0)
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should successfully sign up a user with correct information on facebook signup then login the user and return a jwt token', async done => {
        const facebookInformation = {
            facebook_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        const jwt = await authService.signUp(facebookInformation)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('username', facebookInformation.username).del();
        done();
    })

    test('should successfully sign up a user with correct information on google signup then login the user and return a jwt token', async done => {
        const googleInformation = {
            google_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        const jwt = await authService.signUp(googleInformation)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('username', googleInformation.username).del();
        done();
    })

    test('should throw error for same email signing up if email is not verified', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.signUp(information)
        } catch (err) {
            expect(err).toEqual({
                error: 'Duplicated Email',
                message: 'This email is under verifying',
                suggestSolution: 'Check your mailbox for verification email or request a new verification email'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error if facebook email duplicates with an existing email', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const facebookInformation = {
            facebook_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.signUp(facebookInformation)
        } catch (err) {
            expect(err).toEqual({
                error: 'Duplicated Email',
                message: 'example@example.com duplicates with account test_username',
                suggestSolution: 'Merge Facebook account with test_username'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error if google email duplicates with an existing email', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const googleInformation = {
            google_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.signUp(googleInformation)
        } catch (err) {
            expect(err).toEqual({
                error: 'Duplicated Email',
                message: 'example@example.com duplicates with account test_username',
                suggestSolution: 'Merge Google account with test_username'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error for duplicated username on local signup', async done => {
        const information1 = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const information2 = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'another_example@example.com'
        }
        const id = await authService.signUp(information1)
        try {
            await authService.signUp(information2)
        } catch (err) {
            expect(err).toEqual({
                error: 'Duplicated Username',
                message: `username test_username duplicated`,
                suggestSolution: `Signup with another username`
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error for not matching password and confirmed password on local signup', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'abcd1234',
            email: 'example@example.com'
        }
        try {
            await authService.signUp(information)
        } catch (err) {
            expect(err).toEqual({
                error: 'Unmatched Password',
                message: 'Password submitted does not match the confirmed password',
                suggestSolution: `Recheck both of the informations being submitted`
            })
        }
        done();
    })

    test('should throw error for invalid email on local signup', async done => {
        const information = {
            username: `test_username`,
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'This is Obviously not @ valid email'
        }
        try {
            await authService.signUp(information)
        } catch (err) {
            expect(err).toEqual({
                error: 'Invalid Email',
                message: `The email This is Obviously not @ valid email is invalid`,
                suggestSolution: 'check typo on email'
            })
        }
        done();
    })

    test('should throw error for invalid username on local signup', async done => {
        const information = {
            username: `#$%^&\`\`\`*#'%`,
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        try {
            await authService.signUp(information)
        } catch (err) {
            expect(err).toEqual({
                error: 'Invalid Username',
                message: 'Username must be 5 to 15 characters long and contains no invalid character',
                suggestSolution: 'rename the username'
            })
        }
        done();
    })

    test('should returned a jwt token on facebook login if user exists', async done => {
        const facebookInformation = {
            facebook_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        await authService.signUp(facebookInformation)
        const jwt = await authService.loginFacebook(facebookInformation.access_token)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('facebook_id', facebookInformation.facebook_id).del();
        done();
    })

    test('should not return a jwt token on facebook login with invliad jwt token', async done => {
        try {
            await authService.loginFacebook('invalid access token')
        } catch (err) {
            expect(err).toBeDefined();
        }
        done()
    })

    test('should returned a jwt token on google login if user exists', async done => {
        const googleInformation = {
            google_id: 123456789,
            access_token: 'a random string of access token',
            name: 'John',
            email: 'example@example.com'
        }
        await authService.signUp(googleInformation)
        const jwt = await authService.loginGoogle(googleInformation.access_token)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('google_id', googleInformation.google_id).del();
        done();
    })

    test('should not return a jwt token on google login with invliad jwt token and id token', async done => {
        try {
            await authService.loginGoogle('invalid access token', 'invliad id token')
        } catch (err) {
            expect(err).toBeDefined();
        }
        done()
    })

    test('should return a jwt token when user for a valid login by username', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        const jwt = await authService.loginLocal(information.username, information.password)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should return a jwt token when user for a valid login by email', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        const jwt = await authService.loginLocal(information.email, information.password)
        expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error for invalid username or email', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.loginLocal('invliad username', 'Abcd1234')
        } catch (err) {
            expect(err).toEqual({
                error: 'Incorrect Credential',
                message: `username or password is not found`,
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error for invalid password', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.loginLocal('example@example.com', 'Invalid password')
        } catch (err) {
            expect(err).toEqual({
                error: 'Incorrect Credential',
                message: `username or password is not found`,
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should logout user with the correct jwt token provided', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        const jwt = await authService.loginLocal(information.email, information.password)
        expect(await authService.logout(jwt)).toEqual(1);
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should not logout user with the incorrect jwt token provided', async done => {
        expect(await authService.logout('Invalid jwt token')).toEqual(0);
        done();
    })

    test('should not send password reset email if someone request to reset password with incorrect email', async done => {
        await authService.requestPasswordRequest('invalid email')
        expect(NodeMailer.sendPasswordResetMail).not.toHaveBeenCalled();
        done();
    })

    test('should not send password reset email if someone request to reset password with an unverified email', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        await authService.requestPasswordRequest(information.email)
        expect(NodeMailer.sendPasswordResetMail).not.toHaveBeenCalled();
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should send password reset email if user request to reset password with correct email which has been verified', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        await knex('users_credential').where('login_id', id).update({ email_isVerifying: false })
        await authService.requestPasswordRequest(information.email)
        expect(NodeMailer.sendPasswordResetMail).toHaveBeenCalled();
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should verify the email with the correct key', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        redisClient.set('test_key', 'example@example.com')
        await authService.verifyEmail('test_key')
        let res = knex('users_credential').where('login_id', id)
        expect(res.email_isVerifying).toBeFalsy();
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should not verify the email if the key is invalid', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        try {
            await authService.verifyEmail('invalid key')
        } catch (err) {
            expect(err).toEqual({
                error: 'Expired Key',
                message: 'The key has been expired or invalid'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('verification email key should expire once used', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        redisClient.set('test_key', 'example@example.com')
        await authService.verifyEmail('test_key')
        try {
            await authService.verifyEmail('test_key')
        } catch (err) {
            expect(err).toEqual({
                error: 'Expired Key',
                message: 'The key has been expired or invalid'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should reset password with correct information', async done => {
        const testBcrypt = new Bcrypt(bcrypt)
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        redisClient.set('test_key', 'example@example.com')
        await authService.resetPassword('qwer1234', 'qwer1234', 'test_key')
        let updated = await knex('users_credential').where('login_id', id)
        updated = updated[0]
        expect(await testBcrypt.checkPassword('qwer1234', updated.password)).toBeTruthy;
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should throw error if attemp to reset password with expired or incorrect key', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        redisClient.set('test_key', 'example@example.com')
        try {
            await authService.resetPassword('qwer1234', 'qwer1234', 'invalid key')
        } catch(err) {
            expect(err).toEqual({
                error: 'Expired Key',
                message: 'The key has been expired or invalid',
                suggestSolution: 'Request for another password reset email'
            })
        }
        await knex('users_credential').where('login_id', id).del();
        redisClient.del('test_key')
        done();
    })

    test('should throw error if attemp to reset password with unmatched passwords', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        redisClient.set('test_key', 'example@example.com')
        try {
            await authService.resetPassword('qwer1234', 'qwer4321', 'test_key')
        } catch(err) {
            expect(err).toEqual({
                error: 'Unmatched Password',
                message: 'Password submitted does not match the confirmed password',
                suggestSolution: `Recheck both of the informations being submitted`
            })
        }
        await knex('users_credential').where('login_id', id).del();
        redisClient.del('test_key')
        done();
    })

    test('should return a login Id if a user has valid login and provide the valid jwt key token', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        const jwt = await authService.loginLocal(information.email, information.password)
        expect(await authService.isAuthenticated(jwt)).toEqual(id);
        await knex('users_credential').where('login_id', id).del();
        done();
    })

    test('should return false if a user has invalid login or provide an invalid jwt key token', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        expect(await authService.isAuthenticated('invalid jwt')).toBeFalsy();
        await knex('users_credential').where('login_id', id).del();
        done();
    })
})