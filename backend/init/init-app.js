'use strict';
module.exports = (app, express, bodyParser, cors, router, passport) => {
    app.use(express.static('public'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);
}