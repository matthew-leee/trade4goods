module.exports = (router, authService, productService) => {
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
            res.status(200).json(productInfo);
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.get('/api/allProducts/', async (req, res) => {
        try {
            const productInfo = await productService.getAllProducts()
            res.status(200).json(productInfo);
        } catch (err) {
            res.status(500).json(err)
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
    //router.delete('/api/product/', async (req, res) => {
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

    router.post('/api/offer_product', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            
            if (user_id) {
                await productService.offerProduct(
                    // other product
                    req.body.product_offered, 
                    user_id, 
                    // my product
                    req.body.product_offering)
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

    router.delete('/api/offer_product', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                // await productService.offerProduct(req.query.product_offered, user_id, req.query.product_offering)
                await productService.cancelOfferProduct(req.body.product_offered, user_id, req.body.product_offering)
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

    router.delete('/api/decline_offer', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                
                await productService.declineOffer(req.body.product_offered, user_id, req.body.product_offering)
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

    router.post('/api/comment/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                const ids = await productService.addComment(req.body.product_id, user_id, req.body.comment)
                // res.sendStatus(201)
                res.status(201).json(ids)
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.get('/api/comment/:id', async (req, res) => {
        try {
            // const comments = await productService.getComment(req.params.id)
            const comment = await productService.getComment(req.params.id)
            // res.status(200).json(comments)
            res.status(200).json(comment)
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.put('/api/comment/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.editComment(user_id, req.body.comment_id, req.body.comment)
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

    router.delete('/api/comment/:id', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.deleteComment(user_id, req.params.id)
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

    router.put('/api/like/:id', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                const liked = await productService.likeUnlikeProduct(user_id, req.params.id)
                res.status(200).send(liked)
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/acceptOffer/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await productService.acceptOffer(req.body.product_offered, user_id, req.body.product_offering)
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