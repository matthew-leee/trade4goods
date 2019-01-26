'use strict';
module.exports = (router) => {
    router.get('/ping/', async (req,res) => {
        try{
            res.send("pong")
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
}