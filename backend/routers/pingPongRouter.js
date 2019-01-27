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
    router.get('/ping/', async (req, res) => {
        try {
            res.send("pong")
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
    router.post('/ping/', async (req, res) => {
        try {
            console.log("pong")
            console.log(req.body)
            res.send("pong")
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
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