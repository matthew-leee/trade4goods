module.exports = (app, redisClient, expressSession, RedisStore) => {
    console.log('initializing session')
    const redisStoreSetting = {
        client: redisClient,
        unset: "destroy"
    }

    const sessionStore = new RedisStore(redisStoreSetting);

    const cookieSetting = { 
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: null 
    }

    const settings = {
        store: sessionStore,
        secret: process.env.COOKIE_SECRET,
        cookie: cookieSetting,
        resave: true,
        saveUninitialized: true
    }

    app.use(expressSession(settings));
}