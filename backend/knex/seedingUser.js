const faker = require('faker');
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const knex = require('knex')({
    client: 'postgresql',
    connection: {
    database: process.env.DB_NAME,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
});

(async function excalibur() {
    let userCreArr = [];
    let usersArr = [];
    let seedingTable = ['users_credential','users']
    let fakeDataGenerateNumber = 25


    await knex(seedingTable[0]).del();
    await knex(seedingTable[1]).del();

    for (let i = 1; i < fakeDataGenerateNumber; i++) {
  

        let propic = 'https://dummyimage.com/300/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'
        let user = faker.lorem.word()+faker.lorem.word()+faker.lorem.word()
        let num = Math.floor(Math.random() * 100000000)
        if (num < 9999999) {
            num *= 10
        }
        if (num < 9999999) {
            num *= 10
        }
        if (num < 9999999) {
            num *= 10
        }
        if (num < 9999999) {
            num *= 10
        }


        //user cred table
        let username = user
        let password = faker.internet.password()
        let realpw = '' + password
        const bcrypt = require('bcrypt')
        const promisify = require('util').promisify
        let BCRYPT = require('../services/auth/bcrypt')
        BCRYPT = new BCRYPT(bcrypt, promisify)
        password = await BCRYPT.hashPassword(password)
        let email = faker.internet.email()
        let email_isVerifying = false
        let google_id = null
        let facebook_id = null


        //users table
        // let user_id = i
        let displayed_name = user
        let phone_number = num
        let profile_picture = propic
        let uploaded_products = []
        let liked_products = []
        let trade_history = []
        let chat_basket = []



        userCreArr.push({ "username": username, "password": password, "email": email, "email_isVerifying": email_isVerifying, "google_id": google_id, "facebook_id": facebook_id })
        usersArr.push({"displayed_name":displayed_name,"phone_number":phone_number,"profile_picture":profile_picture,"uploaded_products":uploaded_products,"liked_products":liked_products,"trade_history":trade_history,"chat_basket":chat_basket })
        console.log("id: ", username,'+ pw: ', realpw)
    }
    await knex(seedingTable[0]).insert(userCreArr)
    const id = await knex.select("user_id").from("users_credential")
    console.log (userCreArr)
    const usersArrWithId = usersArr.map((u, i)=>{
        u.user_id = id.map(u=>u.user_id)[i]
        return u
    })
    console.log (usersArrWithId)
    await knex(seedingTable[1]).insert(usersArrWithId)
    console.log("success update table data: " + seedingTable)

})();