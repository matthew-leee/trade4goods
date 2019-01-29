require('dotenv').config()
const knex = require('knex')({
    client: 'postgresql',
    connection: {
    database: process.env.DB_NAME,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
});

(async () => {
    const google = await knex("users").where("displayed_name", "doloribuseumnon")
    console.log (google)
})();


