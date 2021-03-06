/* eslint-disable no-throw-literal */
module.exports = class {
    constructor(knex) {
        this.knex = knex
    }

    async createProfile(info, id) {
        try {
            let profileExist = await this.knex('users').where('user_id', id)
            profileExist = profileExist[0]
            if (profileExist) {
                throw {
                    statusCode: 400,
                    error: "Profile Exist",
                    message: "Profile already exist, please do not create a new one",
                    suggestSolution: "Use Edit Profile instead"
                }
            }
            if (!info.displayed_name) {
                throw {
                    statusCode: 422,
                    error: "Invalid Name",
                    message: "Displayed Name cannot be an empty field",
                    suggestSolution: "Enter the displayed name field"
                }
            }
            if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(info.displayed_name)) {
                throw {
                    statusCode: 422,
                    error: "Invalid Name",
                    message: "Displayed Name contained invalid characters",
                    suggestSolution: "Rename the displayed name"
                }
            }
            if (info.phone_number && isNaN(Number(info.phone_number))) {
                throw {
                    statusCode: 422,
                    error: "Invalid Phone Number",
                    message: "Phone number can contain numbers only",
                }
            }

            const injectingInfo = {
                user_id: id
            }
            injectingInfo.displayed_name = info.displayed_name;
            if (info.phone_number !== "") {
                injectingInfo.phone_number = info.phone_number;
            }
            if (info.profile_picture) {
                injectingInfo.profile_picture = info.profile_picture
            }

            console.log(injectingInfo)
            await this.knex('users').insert(injectingInfo)


        } catch (err) {
            throw (err)
        }
    }

    async updateProfile(info, id) {
        try {
            console.log (info)
            console.log (id)
            let profileExist = await this.knex('users').where('user_id', id)
            profileExist = profileExist[0]
            if (!profileExist) {
                throw {
                    statusCode: 403,
                    error: "Profile Does Not Exist",
                    message: "Profile not found, please sign up and create a new profile",
                    suggestSolution: "Sign Up and create a new profile"
                }
            }
            const updatedInfo = {}
            if (info.displayed_name) {
                console.log ("happy")
                if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(info.displayed_name)) {
                    throw {
                        statusCode: 422,
                        error: "Invalid Name",
                        message: "Displayed Name contained invalid characters",
                        suggestSolution: "Rename the displayed name"
                    }
                } else {
                    updatedInfo.displayed_name = info.displayed_name
                }
            }
            if (info.phone_number) {
                if (isNaN(Number(info.phone_number))) {
                    throw {
                        statusCode: 422,
                        error: "Invalid Phone Number",
                        message: "Phone number can contain numbers only",
                    }
                } else {
                    updatedInfo.phone_number = info.phone_number
                }
            }
            if (info.profile_picture) {
                // if (!/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(info.profile_picture)) {
                //     throw {
                //         statusCode: 415,
                //         error: "Invalid Image Format",
                //         message: "Image has to be base64 encoded, this is probably an error at processing the image",
                //         suggestSolution: "Please do not upload profile picture for now, contact us for help"
                //     }
                // } else {
                updatedInfo.profile_picture = info.profile_picture
                // }
            }
            await this.knex('users').where('user_id', id).update(updatedInfo)
        } catch (err) {
            throw err
        }
    }

    async getProfile(id) {
        console.log(id)
        let user = await this.knex('users').where('user_id', id)
        user = user[0]
        if (!user) {
            throw {
                statusCode: 401,
                error: "Unauthorized",
                message: "User has not been registered, please register before login"
            }
        } else {
            return user
        }
    }

    async getAllProfiles() {
        try {
            return await this.knex('users')
        } catch (err) {
            throw err
        }
    }
}