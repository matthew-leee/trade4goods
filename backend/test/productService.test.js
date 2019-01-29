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
    ProductService = require('../services/product/productService'),
    userProductService = {
        uploadProduct: jest.fn(),
        deleteProduct: jest.fn()
    }

describe('Product Service', () => {
    let productService, test_user_id, image_base64;
    beforeAll(() => {
        image_base64 = fs.readFileSync(__dirname + '/config/image.png', { encoding: 'base64' })
    })

    beforeEach(async () => {
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
        productService = new ProductService(knex, userProductService)
    })

    afterEach(async () => {
        await knex('users').where('user_id', test_user_id).del()
        await knex('users_credential').where('user_id', test_user_id).del()
    })

    afterAll(async () => {
        knex.destroy()
    })

    test('should successfully upload a product for correct information', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        expect(product.product_id).toBeGreaterThanOrEqual(0)
        await knex('products').where('name', 'Test Item').del()
        done();
    })

    test('should call userProductService.uploadProduct to update users tables on valid upload', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        expect(userProductService.uploadProduct).toHaveBeenCalledWith(product.product_id, test_user_id)
        await knex('products').where('name', 'Test Item').del()
        done();
    })

    test('should successfully upload a product with only name and image', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        expect(product.product_id).toBeGreaterThanOrEqual(0)
        await knex('products').where('name', 'Test Item').del()
        done();
    })

    test('should throw error on product upload for name that is not string', async done => {
        const information = {
            name: 123,
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Item Name"
            })
            done();
        }
    })

    test('should throw error on product upload for name that is missing', async done => {
        const information = {
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Item Name"
            })
            done();
        }
    })

    test('should throw error on product upload for invalid image format', async done => {
        const information = {
            name: 'Test Item',
            image: 'not base64 img',
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 415,
                error: "Invalid Image Format",
                message: "Image has to be base64 encoded, this is probably an error at processing the image",
                suggestSolution: "Please skip uploading profile picture for now, contact us for help"
            })
            done();
        }
    })

    test('should throw error on product upload for missing image', async done => {
        const information = {
            name: 'Test Item',
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 415,
                error: "Invalid Image Format",
                message: "Image has to be base64 encoded, this is probably an error at processing the image",
                suggestSolution: "Please skip uploading profile picture for now, contact us for help"
            })
            done();
        }
    })

    test('should throw error on product upload for invalid description', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: true,
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Description",
            })
            done();
        }
    })

    test('should throw error on product upload for invalid expected item', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: ['thing', 'another thing'],
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Expected trade"
            })
            done();
        }
    })

    test('should throw error on product upload for invalid trade location', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_location: { 127: 0, 0: 1 },
            tags: ['test', 'testing', 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Trade Location",
            })
            done();
        }
    })

    test('should throw error on product upload for invalid tags', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.01',
            tags: ['test', 123, 'happy testing'],
        }
        try {
            await productService.uploadProduct(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Input",
                message: "Unknown Error, Invalid Tags",
            })
            done();
        }
    })

    test('should successfully update a product information if provided correctly', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        const update = {
            name: 'Test Item2',
            image: image_base64,
            expectation: 'apple',
            description: 'This is another test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '192.168.0.1',
            tags: ['tags', 'test more']
        }
        await productService.editProduct(update, product.product_id, test_user_id)
        let updated_product = await knex('products').where('name', 'Test Item2');
        updated_product = updated_product[0]
        expect(updated_product.product_id).toEqual(product.product_id)
        await knex('products').where('name', 'Test Item2').del()
        done();
    })

    test('should not update a product information if product_id doesn\'t go under the user', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        const update = {
            name: 'Test Item2',
            image: image_base64,
            expectation: 'apple',
            description: 'This is another test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '192.168.0.1',
            tags: ['tags', 'test more']
        }
        try {
            await productService.editProduct(update, 0, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 403,
                error: "Product not belongs to user",
                message: `user ${test_user_id} does not own product ${0}`
            })
            await knex('products').where('name', 'Test Item').del()
            done();
        }
    })

    /*******************************************************************/
    /*    Skipping repetitive error handling tests for edit product    */
    /*******************************************************************/

    test('should delete a product providing with matched product id and user id', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        await productService.deleteProduct(product.product_id, test_user_id);
        let deleted = await knex('products').where('name', 'Test Item');
        deleted = deleted[0]
        expect(deleted).toBeUndefined();
        done();
    })

    test('should throw error if trying to delete product with unmatched user id and product id', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        try {
            await productService.deleteProduct(0, test_user_id);
        } catch (err) {
            expect(err).toEqual({
                statusCode: 403,
                error: "Product not belongs to user",
                message: `user ${test_user_id} does not own product ${0}`
            });
            await knex('products').where('name', 'Test Item').del()
            done();
        }
    })

    test('should call userProductService.deleteProduct to update users tables on valid delete', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        await productService.deleteProduct(product.product_id, test_user_id);
        expect(userProductService.deleteProduct).toHaveBeenCalledWith(product.product_id, test_user_id);
        done();
    })

    test('should return product info on get with corresponding product id', async done => {
        const information = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(information, test_user_id)
        let product = await knex('products').where('name', 'Test Item');
        product = product[0]
        const info = await productService.getProduct(product.product_id);
        expect(info).toBeDefined();
        await knex('products').where('name', 'Test Item').del()
        done();
    })

    test('should throw error for non-existing product', async done => {
        try {
            await productService.getProduct(0);
        } catch (err) {
            expect(err).toEqual({
                statusCode: 404,
                error: "Product not found",
                message: `product 0 does not exists`
            });
            done();
        }
    })

    test('should allow user to offer product to another product', async done => {
        test_user_id2 = await knex('users_credential').insert({
            username: 'test_username2',
            password: 'Abcd1234',
            email: 'example2@example.com'
        }).returning('user_id')
        test_user_id2 = test_user_id2[0]
        const profileService = new ProfileService(knex)
        const user2 = {
            displayed_name: 'TEST',
            phone_number: 30624770,
        }
        await profileService.createProfile(user2, test_user_id2)
        let product1 = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product1, test_user_id)
        product1 = await knex('products').where('name', 'Test Item')
        product1 = product1[0]
        let product2 = {
            name: 'Test Item2',
            image: image_base64,
            expectation: 'item',
            description: 'This is another test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product2, test_user_id2)
        product2 = await knex('products').where('name', 'Test Item2')
        product2 = product2[0]
        await productService.offerProduct(product2.product_id, test_user_id, product1.product_id)
        product2 = await knex('products').where('name', 'Test Item2')
        product2 = product2[0]
        expect(product2.offered_by).toEqual([product1.product_id])
        await knex('products').where('product_id', product1.product_id).orWhere('product_id', product2.product_id).del()
        await knex('users').where('user_id', test_user_id2).del()
        await knex('users_credential').where('user_id', test_user_id2).del()
        done()
    })

    test('should allow user to delete offer on product they he has once offered', async done => {
        test_user_id2 = await knex('users_credential').insert({
            username: 'test_username2',
            password: 'Abcd1234',
            email: 'example2@example.com'
        }).returning('user_id')
        test_user_id2 = test_user_id2[0]
        const profileService = new ProfileService(knex)
        const user2 = {
            displayed_name: 'TEST',
            phone_number: 30624770,
        }
        await profileService.createProfile(user2, test_user_id2)
        let product1 = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product1, test_user_id)
        product1 = await knex('products').where('name', 'Test Item')
        product1 = product1[0]
        let product2 = {
            name: 'Test Item2',
            image: image_base64,
            expectation: 'item',
            description: 'This is another test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product2, test_user_id2)
        product2 = await knex('products').where('name', 'Test Item2')
        product2 = product2[0]
        await productService.offerProduct(product2.product_id, test_user_id, product1.product_id)
        await productService.cancelOfferProduct(product2.product_id, test_user_id, product1.product_id)
        product2 = await knex('products').where('name', 'Test Item2')
        product2 = product2[0]
        expect(product2.offered_by).toEqual([])
        await knex('products').where('product_id', product1.product_id).orWhere('product_id', product2.product_id).del()
        await knex('users').where('user_id', test_user_id2).del()
        await knex('users_credential').where('user_id', test_user_id2).del()
        done()
    })

    test('should throw error on delete offer if product A is not being offered to product B', async done => {
        test_user_id2 = await knex('users_credential').insert({
            username: 'test_username2',
            password: 'Abcd1234',
            email: 'example2@example.com'
        }).returning('user_id')
        test_user_id2 = test_user_id2[0]
        const profileService = new ProfileService(knex)
        const user2 = {
            displayed_name: 'TEST',
            phone_number: 30624770,
        }
        await profileService.createProfile(user2, test_user_id2)
        let product1 = {
            name: 'Test Item',
            image: image_base64,
            expectation: 'another item',
            description: 'This is a test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product1, test_user_id)
        product1 = await knex('products').where('name', 'Test Item')
        product1 = product1[0]
        let product2 = {
            name: 'Test Item2',
            image: image_base64,
            expectation: 'item',
            description: 'This is another test item, to test whether it can be injected into the database and pass tests',
            trade_locaiton: '127.0.0.1',
            tags: ['test', 'testing', 'happy testing'],
        }
        await productService.uploadProduct(product2, test_user_id2)
        product2 = await knex('products').where('name', 'Test Item2')
        product2 = product2[0]
        try {
            await productService.cancelOfferProduct(product2.product_id, test_user_id, product1.product_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 406,
                error: "Product has not offer",
                message: `product ${product1.product_id} did not offer on ${product2.product_id}`
            })
            await knex('products').where('product_id', product1.product_id).orWhere('product_id', product2.product_id).del()
            await knex('users').where('user_id', test_user_id2).del()
            await knex('users_credential').where('user_id', test_user_id2).del()
            done()
        }
    })
})
