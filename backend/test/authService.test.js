require('dotenv').config();
const
    axios = require('axios'),
    bcrypt = require('bcrypt'),
    Bcrypt = require('../auth/bcrypt'),
    jwt = require('jsonwebtoken'),
    { promisify } = require('util'),
    redis = require('redis'),
    redisClient = require('../init/init-redis')(redis),
    knex = require('knex')({
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        }
    }),
    AuthService = require('../auth/authService'),
    authService = new AuthService(axios, new Bcrypt(bcrypt), jwt, promisify, redisClient, knex)

describe('Sign up', () => {
    afterAll(() => {
        redisClient.end(true);
        knex.destroy();
    })

    test('should successfully sign up a user with correct information (local signup)', async done => {
        const information = {
            username: 'test_username',
            password: 'Abcd1234',
            confirmed_password: 'Abcd1234',
            email: 'example@example.com'
        }
        const id = await authService.signUp(information)
        await knex('users_credential').where('login_id', id[0]).del();
        expect(id[0]).toBeGreaterThanOrEqual(0)
        done();
    })
})