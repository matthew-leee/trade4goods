'use strict'
module.exports = (authService, productService) => {
    router.post('/api/product/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.uploadProduct(req.body, user_id)
                res.sendStatus(201)
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.get('/api/product/:id', async (req, res) => {
        try {
            const productInfo = await productService.getProduct(req.params.id)
            res.send(200).json(productInfo);
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.put('/api/product/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.editProduct(req.body, user_id)
                res.sendStatus(200)
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.delete('/api/product/:id', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.deleteProduct(req.params.id, user_id)
                res.sendStatus(200)
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
}