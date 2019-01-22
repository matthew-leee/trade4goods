const
    bcrypt = require('bcrypt'),
    Bcrypt = require('../services/auth/bcrypt'),
    promisify = require('util').promisify

describe('Bcrypt Hash and Compare', () => {
    const bcryptService = new Bcrypt(bcrypt, promisify)

    test('should return a hashed password from a plaintext password', async done => {
        const hashedPassword = await bcryptService.hashPassword('myPassword')
        expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/)
        done();
    })
    
    test('should return true for compare password that matches', async done => {
        const hashedPassword = await bcryptService.hashPassword('myPassword')
        const isMatch = await bcryptService.checkPassword('myPassword', hashedPassword)
        expect(isMatch).toBe(true);
        done();
    })

    test('should return false for compare password that doesn\'t match', async done => {
        const hashedPassword = await bcryptService.hashPassword('myPassword')
        const isMatch = await bcryptService.checkPassword('InvalidPassword', hashedPassword)
        expect(isMatch).toBe(false);
        done();
    })
})
