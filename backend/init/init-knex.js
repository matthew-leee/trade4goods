'use strict';
module.exports = knex => knex({
    client: 'postgresql',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
});