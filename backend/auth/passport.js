'use strict';
const users = require('./users');
module.exports = (passport, PassportJWT, FacebookStrategy, GoogleStrategy, bcrypt, knex) => {
    const JwtStrategy = PassportJWT.Strategy,
        ExtractJwt = PassportJWT.ExtractJwt;

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, (payload, done) => {
        console.log(payload)
        const user = users[payload.id]; //knex will be used
        return (user) ?
            done(null, { id: user.id }) :
            done(new Error("User not found"), null);
    }))

    // passport.use('google', new GoogleStrategy({
    //     clientID: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    //     callbackURL: `/auth/google/callback`
    // }, async (accessToken, refreshToken, profile, done) => {
    //     const matchedUser = await knex('login_info').where({ access_token: accessToken })
    //     if (matchedUser.length === 0) {
    //         const newUser = {
    //             display_name: profile.displayName,
    //             google_id: profile.id,
    //             access_token: accessToken
    //         }
    //         const userId = await knex('login_info').insert(newUser).returning('id');
    //         newUser.id = userId[0];
    //         return done(null, newUser)
    //     }
    //     return done(null, matchedUser[0]);
    // }
    // ));

    // passport.use('facebook', new FacebookStrategy({
    //     clientID: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET,
    //     callbackURL: `/auth/facebook/callback`
    // }, async (accessToken, refreshToken, profile, done) => {
    //     const matchedUser = await knex('login_info').where({ access_token: accessToken })
    //     if (matchedUser.length === 0) {
    //         const newUser = {
    //             display_name: profile.displayName,
    //             facebook_id: profile.id,
    //             access_token: accessToken
    //         }
    //         const userId = await knex('login_info').insert(newUser).returning('id');
    //         newUser.id = userId[0];
    //         return done(null, newUser)
    //     }
    //     return done(null, matchedUser[0]);
    // }
    // ));

    // passport.serializeUser((user, done) => {
    //     return done(null, user.id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     const users = await knex('login_info').where({ id: id });
    //     if (users.length == 0) return done(new Error(`Wrong user id ${id}`));
    //     const user = users[0];
    //     return done(null, user);
    // });
};