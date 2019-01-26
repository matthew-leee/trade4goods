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
    let productArr = [];
    let userCreArr = [];
    let usersArr = [];
    let seedingTable = ['products', 'users_credential','users']
    let fakeDataGenerateNumber = 11


    await knex(seedingTable[0]).del();
    await knex(seedingTable[1]).del();
    await knex(seedingTable[2]).del();

    for (let i = 1; i < fakeDataGenerateNumber; i++) {
        let picUrl = 'https://dummyimage.com/' + Math.floor(Math.random() * (1200 - 350) + 350) + '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'

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

        //product table
        let name = faker.commerce.productName()
        let image = [picUrl]
        let description = faker.lorem.paragraph()
        let expectation = faker.lorem.sentences()
        let trade_location = faker.lorem.word()
        let tags = [faker.lorem.word(), faker.lorem.word()]
        let uploaded_by = i
        let liked_by = null
        let comments = null
        let offered_by = null
        let sold_to = null
        let sold_at = null

        //user cred table
        let username = user
        let password = faker.internet.password()
        let email = faker.internet.email()
        let email_isVerifying = false
        let google_id = null
        let facebook_id = null
        let access_token = null


        //users table
        let user_id = i
        let displayed_name = user
        let phone_number = num
        let profile_picture = propic
        let uploaded_products = null
        let liked_products = null
        let offered_products =null
        let products_being_offered = null
        let trade_history =null
        let chat_basket =null


        let cool = { "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "uploaded_by": uploaded_by, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at }

        let cooool = { "username": username, "password": password, "email": email, "email_isVerifying": email_isVerifying, "google_id": google_id, "facebook_id": facebook_id, "access_token": access_token }

        let coooooooool = {"user_id":user_id,"displayed_name":displayed_name,"phone_number":phone_number,"profile_picture":profile_picture,"uploaded_products":uploaded_products,"liked_products":liked_products, "offered_products":offered_products,"products_being_offered":products_being_offered,"trade_history":trade_history,"chat_basket":chat_basket }

        console.log(cool,cooool,coooooooool)


        productArr.push({ "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "uploaded_by": uploaded_by, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at })

        userCreArr.push({ "username": username, "password": password, "email": email, "email_isVerifying": email_isVerifying, "google_id": google_id, "facebook_id": facebook_id, "access_token": access_token })

        usersArr.push({"user_id":user_id,"displayed_name":displayed_name,"phone_number":phone_number,"profile_picture":profile_picture,"uploaded_products":uploaded_products,"liked_products":liked_products, "offered_products":offered_products,"products_being_offered":products_being_offered,"trade_history":trade_history,"chat_basket":chat_basket })
        console.log("looks good count:" + i)
    }
    await knex(seedingTable[1]).insert(userCreArr)
    await knex(seedingTable[2]).insert(usersArr)
    await knex(seedingTable[0]).insert(productArr)



    console.log("success update table data: " + seedingTable)

})();