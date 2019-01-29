    //keep this shit until u make a new one for all product that product status is looking for offers    //keep this shit until u make a new one for all product that status is looking for offers    //keep this shit until u make a new one for all product that status is looking for offers    //keep this shit until u make a new one for all product that status is looking for offers
    //keep this shit until u make a new one for all product that product status is looking for offers
    const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "trade",
        user: "trade",
        password: "trade"
    }
});

'use strict';
module.exports = (router) => {
    
    
    //keep this shit until u make a new one for all product that product status is looking for offers
    router.get('/getallproductsplease/', async (req, res) => {
        try {
            console.log("someone request all products")
            let data = await knex.raw("select * from products")
            res.send(JSON.stringify(data.rows))
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    }) 
}