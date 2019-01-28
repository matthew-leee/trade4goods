module.exports = class {
    constructor(bcrypt, promisify) {
        this.genSalteAsync = promisify(bcrypt.genSalt)
        this.hashAsync = promisify(bcrypt.hash)
        this.compareAsync = promisify(bcrypt.compare)
    }

    async hashPassword(plainTextPassword) {
        try {
            const salt = await this.genSalteAsync()
            return await this.hashAsync(plainTextPassword, salt)
        } catch(err) {
            throw err
        }
    };

    async checkPassword(plainTextPassword, hashedPassword) {
        try {
            return await this.compareAsync(plainTextPassword, hashedPassword)
        } catch(err) {
            throw err
        }
    };
}