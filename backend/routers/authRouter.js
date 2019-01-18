'use strict';
module.exports = (router, passport, authService) => {
    router.post('api/login', (req, res) => {
        const jwt = authService.login(req.body.username, req.body.password)
        if (jwt) {
            req.session.jwt = jwt
            res.sendStatus(200)
        } else {
            res.send('Invalid Credential')
        }
    })

    // router.get('/secret', async (req, res) => {
    //     try {
    //         const user = await authService.isAuthenticated(req.session.jwt)
    //         console.log(user)
    //         if (!user) {
    //             res.sendStatus(401)
    //             return;
    //         }
    //         res.send('a secret')
    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // })

    router.post('api/logout', async (req, res) => {
        try {
            const logoutStatus = await authService.logout(req.session.jwt)
            req.session.jwt = null
                (logoutStatus) ? res.sendStatus(200) : res.status(500).send('this user is not logged in')
        } catch (err) {
            res.status(500).json(err)
        }
    })

    router.post('api/facebook_login', async(req, res) => {
        try {
            const jwt = await authService.loginFacebook(req.body.access_token)
            req.session.jwt = jwt
            res.sendStatus(200)
        } catch (err) {
            res.status(500).json(err)
        }
    })
}
