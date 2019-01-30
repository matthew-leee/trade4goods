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
    let productArr = [];
    let seedingTable = 'products'
    let fakeDataGenerateNumber = 1000


    await knex(seedingTable).del();

    for (let i = 1; i < fakeDataGenerateNumber; i++) {
        let picUrl = 'https://dummyimage.com/' + Math.floor(Math.random() * (800 - 350) + 350) +'x'+Math.floor(Math.random() * (800 - 350) + 350)+ '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'
        let picUrl2 = 'https://dummyimage.com/' + Math.floor(Math.random() * (800 - 350) + 350) +'x'+Math.floor(Math.random() * (800 - 350) + 350)+  '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'
        let picUrl3 = 'https://dummyimage.com/' + Math.floor(Math.random() * (800- 350) + 350) +'x'+Math.floor(Math.random() * (800 - 350) + 350)+  '/' + Math.floor(Math.random() * 999999) + '/' + Math.floor(Math.random() * 999999) + '.png'
        

        function randomPic(){
            let r = Math.floor(Math.random()* 3 )
            if(r === 0){
                return []
            }
            if(r===1){
                return[picUrl]
            }
            if(r===2){
                return[picUrl,picUrl2]
            }
            if(r===3){
                return[picUrl,picUrl2,picUrl3]
            }
        }

        //product table
        let name = faker.commerce.productName()
        let image = randomPic()
        let description = faker.lorem.paragraph().slice(0, 255)
        let expectation = faker.lorem.sentences().slice(0, 255)
        let trade_location = faker.lorem.word()
        let tags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()]
        // let uploaded_by = i
        let liked_by = []
        let comments = []
        let offered_by = []
        let sold_to = null
        let sold_at = null



        let cool = { "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at }

        productArr.push({ "name": name, "image": image, "description": description, "expectation": expectation, "trade_location": trade_location, "tags": tags, "liked_by": liked_by, "comments": comments, "offered_by": offered_by, "sold_to": sold_to, "sold_at": sold_at })
        
        console.log(cool)
    }
    const id = await knex.select("user_id").from("users")
    const productArrWithId = productArr.map((u, i)=>{
        u.uploaded_by = Math.floor(Math.random()* (id.length - 1) + 1)
        return u
    })
    await knex(seedingTable).insert(productArrWithId)
    console.log("success update table data: " + seedingTable)
})();