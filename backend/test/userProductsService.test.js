const
    fs = require('fs'),
    env = require('./config/env'),
    knex = require('knex')({
        client: 'postgresql',
        connection: {
            database: env.DB_NAME,
            user: env.DB_USERNAME,
            password: env.DB_PASSWORD,
        }
    }),
    ProfileService = require('../services/profile/profileService'),
    UserProductService = require('../services/product/userProductService')

describe('Product Service', () => {
    let userProductService, test_user_id, image_base64;
    beforeAll(() => {
        image_base64 = fs.readFileSync(__dirname + '/config/image.png', { encoding: 'base64' })
    })

    beforeEach(async () => {
        userProductService = new UserProductService(knex)
        test_user_id = await knex('users_credential').insert({
            username: 'test_username',
            password: 'Abcd1234',
            email: 'example@example.com'
        }).returning('user_id')
        test_user_id = test_user_id[0]
        const profileService = new ProfileService(knex)
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
    })

    afterEach(async () => {
        await knex('users').where('user_id', test_user_id).del()
        await knex('users_credential').where('user_id', test_user_id).del()
    })

    afterAll(async () => {
        knex.destroy()
    })

    test('should also add product_id into user database when users first upload a product', async done => {
        await userProductService.uploadProduct(123, test_user_id)
        let updated = await knex('users').where('user_id', test_user_id)
        updated = updated[0]
        expect(updated.uploaded_products).toEqual([123])
        done()
    })

    test('should also push product_id into user database when users first upload more products', async done => {
        await userProductService.uploadProduct(123, test_user_id)
        await userProductService.uploadProduct(567, test_user_id)
        await userProductService.uploadProduct(789, test_user_id)
        await userProductService.uploadProduct(1011, test_user_id)
        let updated = await knex('users').where('user_id', test_user_id)
        updated = updated[0]
        expect(updated.uploaded_products).toEqual([123,567,789,1011])
        done()
    })

    test('should delete product record from user database on request', async done => {
        await userProductService.uploadProduct(123, test_user_id)
        await userProductService.uploadProduct(567, test_user_id)
        await userProductService.uploadProduct(789, test_user_id)
        await userProductService.uploadProduct(1011, test_user_id)
        await userProductService.deleteProduct(567, test_user_id)
        let updated = await knex('users').where('user_id', test_user_id)
        updated = updated[0]
        expect(updated.uploaded_products).toEqual([123,789,1011])
        done()
    })
})
