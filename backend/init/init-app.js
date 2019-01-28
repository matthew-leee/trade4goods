'use strict';
const path = require('path')
module.exports = (app, express, bodyParser, cors, router) => {
    app.use(express.static(path.join(__dirname,'..','public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);
}