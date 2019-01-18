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
passport = require('passport'),
PassportJWT = require('passport-jwt'),
FacebookStrategy = require('passport-facebook').Strategy,
GoogleStrategy = require('passport-google-oauth20').Strategy,
bcrypt = require('bcrypt'),
// nodemailer = require('nodemailer'),  to be implemented
// randomstring = require("randomstring"), to be implemented
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
Bcrypt = require('./auth/bcrypt'),
redisClient = require('./init/init-redis')(redis),
authService = require('./auth/authService'),
router = require('./routers/router')(express, passport, new authService(axios, new Bcrypt(bcrypt), jwt, promisify, redisClient, knex))
require('./init/init-session')(app, redisClient, expressSession, RedisStore)
require('./init/init-app')(app, express, bodyParser, cors, router, passport)
require('./auth/passport')(passport, PassportJWT, FacebookStrategy, GoogleStrategy, new Bcrypt(bcrypt), knex);

//server starts
server.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT} at ${new Date()}`));
