module.exports = (router, authService) => {
    router.get('/api/isLoggedIn', async (req,res) => {
        try {
            (await authService.isAuthenticated(req.session.jwt)) ?
            res.status(200).send(true) : res.status(200).send(false)
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
    router.post('/api/signup', async (req, res) => {
        try {
            await authService.signUp(req.body)
            res.sendStatus(201)
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/login', async (req, res) => {
        try {
            const jwt = await authService.loginLocal(req.body.username_or_email, req.body.password)
            req.session.jwt = jwt
            res.sendStatus(200)
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/facebook_login', async (req, res) => {
        try {
            const jwt = await authService.loginFacebook(req.body.facebook_id, req.body.access_token)
            if (jwt) {
                
                req.session.jwt = jwt
                res.sendStatus(200)
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/google_login', async (req, res) => {
        try {
            
            const jwt = await authService.loginGoogle(req.body.google_id, req.body.access_token, req.body.id_token)
            if (jwt) {
                req.session.jwt = jwt
                res.sendStatus(200)
            }
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/logout', async (req, res) => {
        try {
            const logoutStatus = await authService.logout(req.session.jwt)
            req.session.jwt = null
                (logoutStatus) ? res.sendStatus(200) : res.status(500).send('this user is not logged in')
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/verifyEmail/:id', async (req, res) => {
        try {
            await authService.verifyEmail(req.params.id)
            res.sendStatus(200)
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/forgetPassword', async (req, res) => {
        try {
            await authService.requestPasswordRequest(req.body.email)
            res.sendStatus(202)
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.post('/api/resetPassword', async (req, res) => {
        try {
            await authService.resetPassword(req.body.password, req.body.confirmed_password, req.body.key)
            res.sendStatus(200)
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
}
