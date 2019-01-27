'use strict';
//config
require('dotenv').config();
const 
fs = require('fs'),
path = require('path'),
options = {
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.crt')),
  key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.key'))
}

//library dependencies
const 
https = require('https'),
express = require('express'),
promisify = require('util').promisify,
app = express(),
axios = require('axios'),
server = https.createServer(options, app),
bodyParser = require('body-parser'),
cors = require('cors'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
nodemailer = require('nodemailer'),
randomstring = require('randomstring'),
expressSession = require('express-session'),
RedisStore = require('connect-redis')(expressSession),
redis = require('redis'),
knex = require('knex')({
  client: 'postgresql',
  connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
  }
});

//modules
const
redisClient = require('./init/init-redis')(redis),
BcryptService = require('./services/auth/bcrypt'),
NodemailerService = require('./services/auth/mailVerify'),
AuthService = require('./services/auth/authService'),
ProfileService = require('./services/profile/profileService'),
UserProductService = require('./services/product/userProductService'),
ProductService = require('./services/product/productService'),
Bcrypt = new BcryptService(bcrypt, promisify),
Nodemailer = new NodemailerService(nodemailer),
authService = new AuthService(axios, Bcrypt, jwt, promisify, redisClient, knex, Nodemailer, randomstring),
profileService = new ProfileService(knex),
userProductService = new UserProductService(knex),
productService = new ProductService(knex, userProductService),
router = require('./routers/router')(express, authService, profileService, productService)
require('./init/init-session')(app, redisClient, expressSession, RedisStore)
require('./init/init-app')(app, express, bodyParser, cors, router)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router)

//server starts
server.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT} at ${new Date()}`));
