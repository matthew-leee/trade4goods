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
    ProfileService = require('../services/profile/profileService')

describe('Profile Service', () => {
    let profileService;
    let test_user_id;
    let image_base64;
    beforeAll(async () => {
        test_user_id = await knex('users_credential').insert({
            username: 'test_username',
            password: 'Abcd1234',
            email: 'example@example.com'
        }).returning('user_id')
        test_user_id = test_user_id[0]
        image_base64 = fs.readFileSync(__dirname + '/config/image.png', { encoding: 'base64' })
    })

    beforeEach(() => {
        profileService = new ProfileService(knex)
    })

    afterAll(async () => {
        await knex('users_credential').where('username', 'test_username').andWhere('password', 'Abcd1234').andWhere('email', 'example@example.com').del()
        knex.destroy()
    })

    test('should successfully create a profile for user that has logged in and signed up', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        let createdUser = await knex('users').where('displayed_name', 'John').andWhere('phone_number', 30624700).andWhere('profile_picture', image_base64)
        createdUser = createdUser[0]
        expect(createdUser).toBeDefined();
        await knex('users').where('user_id', test_user_id).del()
        done()
    })

    test('should throw error on create profile if the profile already exists', async done => {
        const information1 = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        const information2 = {
            displayed_name: 'Peter',
            phone_number: 30624770,
            profile_picture: image_base64
        }
        await profileService.createProfile(information1, test_user_id)
        try {
            await profileService.createProfile(information2, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 400,
                error: "Profile Exist",
                message: "Profile already exist, please do not create a new one",
                suggestSolution: "Use Edit Profile instead"
            })
            await knex('users').where('user_id', test_user_id).del()
            done()
        }
    })

    test('should throw error on create profile if the displayed name is invalid', async done => {
        const information = {
            displayed_name: 'John!@#$%^&*',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        try {
            await profileService.createProfile(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Name",
                message: "Displayed Name contained invalid characters",
                suggestSolution: "Rename the displayed name"
            })
            done()
        }
    })

    test('should throw error on create profile if the displayed name is missing', async done => {
        const information = {
            phone_number: 30624700,
            profile_picture: image_base64
        }
        try {
            await profileService.createProfile(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Name",
                message: "Displayed Name cannot be an empty field",
                suggestSolution: "Enter the displayed name field"
            })
            done()
        }
    })

    test('should throw error on create profile if the phone number is invalid', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: '+852 30624700',
            profile_picture: image_base64
        }
        try {
            await profileService.createProfile(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Phone Number",
                message: "Phone number can contain numbers only",
            })
            done()
        }
    })

    test('should throw error on create profile if the phone number is missing', async done => {
        const information = {
            displayed_name: 'John',
            profile_picture: image_base64
        }
        try {
            await profileService.createProfile(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Phone Number",
                message: "Phone number can contain numbers only",
            })
            done()
        }
    })

    test('should throw error on create profile if profile picture exists but not encoded in base64', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: fs.readFileSync(__dirname + '/config/image.png')
        }
        try {
            await profileService.createProfile(information, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 415,
                error: "Invalid Image Format",
                message: "Image has to be base64 encoded, this is probably an error at processing the image",
                suggestSolution: "Please skip uploading profile picture for now, contact us for help"
            })
            done()
        }
    })

    test('should successfully create a profile for user even the user provided no profile picture', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
        }
        await profileService.createProfile(information, test_user_id)
        let createdUser = await knex('users').where('displayed_name', 'John').andWhere('phone_number', 30624700)
        createdUser = createdUser[0]
        expect(createdUser).toBeDefined();
        await knex('users').where('user_id', test_user_id).del()
        done()
    })

    test('should successfully update a profile for user exists and correct item and correct id', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        let newInfo = {
            displayed_name: 'Mr John'
        }
        await profileService.updateProfile(newInfo, test_user_id)
        newInfo = {
            phone_number: 534202
        }
        await profileService.updateProfile(newInfo, test_user_id)
        newInfo = {
            profile_picture: image_base64
        }
        await profileService.updateProfile(newInfo, test_user_id)
        let updatedProfile = await knex('users').where('user_id', test_user_id)
        updatedProfile = updatedProfile[0]
        // skipping profile_picture test since buffer wont be completely equalized
        const checker = {
            displayed_name: updatedProfile.displayed_name,
            phone_number: updatedProfile.phone_number,
        }
        const expectation = {
            displayed_name: "Mr John",
            phone_number: 534202,
        }
        expect(checker).toEqual(expectation);
        await knex('users').where('user_id', test_user_id).del();
        done();
    })

    test('should throw error for invalid user that has no profile created beforehand', async done => {
        const newInformation = {
            displayed_name: 'Mr John',
            phone_number: 534202
        }
        try {
            await profileService.updateProfile(newInformation, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 403,
                error: "Profile Does Not Exist",
                message: "Unknown Error, profile not found",
                suggestSolution: "Sign Up and create a new profile"
            })
            done();
        }
    })

    test('should throw error for invalid username on profile update', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        const newInformation = {
            displayed_name: 'Mr John&##^$@#^&@$#^&$^',
            phone_number: 534202
        }
        try {
            await profileService.updateProfile(newInformation, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Name",
                message: "Displayed Name contained invalid characters",
                suggestSolution: "Rename the displayed name"
            })
            await knex('users').where('user_id', test_user_id).del();
            done();
        }
    })

    test('should throw error for invalid phone number on profile update', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        const newInformation = {
            displayed_name: 'Mr John',
            phone_number: 'not a number'
        }
        try {
            await profileService.updateProfile(newInformation, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 422,
                error: "Invalid Phone Number",
                message: "Phone number can contain numbers only",
            })
            await knex('users').where('user_id', test_user_id).del();
            done();
        }
    })

    test('should throw error for invalid image on profile update', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        const newInformation = {
            displayed_name: 'Mr John',
            profile_picture: 'invalid image'
        }
        try {
            await profileService.updateProfile(newInformation, test_user_id)
        } catch (err) {
            expect(err).toEqual({
                statusCode: 415,
                error: "Invalid Image Format",
                message: "Image has to be base64 encoded, this is probably an error at processing the image",
                suggestSolution: "Please do not upload profile picture for now, contact us for help"
            })
            await knex('users').where('user_id', test_user_id).del();
            done();
        }
    })

    test('should reponse to get profile with corresponding user id', async done => {
        const information = {
            displayed_name: 'John',
            phone_number: 30624700,
            profile_picture: image_base64
        }
        await profileService.createProfile(information, test_user_id)
        const user = await profileService.getProfile(test_user_id)
        expect(user).toBeDefined();
        await knex('users').where('user_id', test_user_id).del();
        done();
    })
})
