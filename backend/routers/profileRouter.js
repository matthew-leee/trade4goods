module.exports = (router, authService, profileService) => {
    router.post('/api/profile/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await profileService.createProfile(req.body, user_id)
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

    router.put('/api/profile/', async (req, res) => {
        try {
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                await profileService.updateProfile(req.body, user_id)
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

    router.get('/api/profile/', async (req,res) => {
        try{
            const user_id = await authService.isAuthenticated(req.session.jwt)
            if (user_id) {
                const profile = await profileService.getProfile(user_id)
                res.json(profile);
            } else {
                res.sendStatus(401);
            }
        } catch(err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })

    router.get('/api/allProfiles/', async (req, res)=>{
        try {
            const allProfile = await profileService.getAllProfile()
            res.json(allProfile)
        } catch (err) {
            const statusCode = err.statusCode || 500
            delete err.statusCode
            res.status(statusCode).json(err)
        }
    })
}