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
    let seedingTable = 'products'
    let fakeDataGenerateNumber = 50


    await knex(seedingTable).del();

    for (let i = 1; i < fakeDataGenerateNumber; i++) {
        let picUrl = 'https://dummyimage.com/' + Math.floor(Math.random() * (1200 - 350) + 350) + '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'
        let picUrl2 = 'https://dummyimage.com/' + Math.floor(Math.random() * (1200 - 350) + 350) + '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'

        //product table
        let name = faker.commerce.productName()
        let image = [picUrl,picUrl2]
        let description = faker.lorem.paragraph().slice(0, 255)
        let expectation = faker.lorem.sentences().slice(0, 255)
        let trade_location = faker.lorem.word()
        let tags = [faker.lorem.word(), faker.lorem.word()]
        // let uploaded_by = i
        let liked_by = null
        let comments = null
        let offered_by = null
        let sold_to = null
        let sold_at = null



        let cool = { "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at }

        productArr.push({ "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at })
        
        console.log(cool)
        console.log("looks good count:" + i)
    }
    const id = await knex.select("user_id").from("users")
    const productArrWithId = productArr.map((u, i)=>{
        u.uploaded_by = id.map(u=>u.user_id)[i]
        return u
    })
    await knex(seedingTable).insert(productArrWithId)


    console.log("success update table data: " + seedingTable)

})();