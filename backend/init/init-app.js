'use strict';
module.exports = (app, express, bodyParser, cors, router) => {
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);
}