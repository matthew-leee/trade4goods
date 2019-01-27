const faker = require('faker');

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "trade",
        user: "trade",
        password: "trade"
    }
});

(async function excalibur() {
    let userCreArr = [];
    let usersArr = [];
    let seedingTable = ['users_credential','users']
    let fakeDataGenerateNumber = 200


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
        let email = faker.internet.email()
        let email_isVerifying = false
        let google_id = null
        let facebook_id = null
        let access_token = null


        //users table
        // let user_id = i
        let displayed_name = user
        let phone_number = num
        let profile_picture = propic
        let uploaded_products = null
        let liked_products = null
        let offered_products =null
        let products_being_offered = null
        let trade_history =null
        let chat_basket =null


      
        // let cooool = { "username": username, "password": password, "email": email, "email_isVerifying": email_isVerifying, "google_id": google_id, "facebook_id": facebook_id, "access_token": access_token }

        // let coooooooool = {"user_id":user_id,"displayed_name":displayed_name,"phone_number":phone_number,"profile_picture":profile_picture,"uploaded_products":uploaded_products,"liked_products":liked_products, "offered_products":offered_products,"products_being_offered":products_being_offered,"trade_history":trade_history,"chat_basket":chat_basket }

        // console.log(cooool,coooooooool)

        userCreArr.push({ "username": username, "password": password, "email": email, "email_isVerifying": email_isVerifying, "google_id": google_id, "facebook_id": facebook_id, "access_token": access_token })

        usersArr.push({"displayed_name":displayed_name,"phone_number":phone_number,"profile_picture":profile_picture,"uploaded_products":uploaded_products,"liked_products":liked_products, "offered_products":offered_products,"products_being_offered":products_being_offered,"trade_history":trade_history,"chat_basket":chat_basket })
        console.log("looks good count:" + i)
    }
    await knex(seedingTable[0]).insert(userCreArr)
    const id = await knex.select("user_id").from("users_credential")
    console.log (id)
    const usersArrWithId = usersArr.map((u, i)=>{
        u.user_id = id.map(u=>u.user_id)[i]
        return u
    })
    console.log (usersArrWithId)
    await knex(seedingTable[1]).insert(usersArrWithId)



    console.log("success update table data: " + seedingTable)

})();