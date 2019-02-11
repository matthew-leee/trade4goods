'use strict';
require('dotenv').config();

//library dependencies
const 
https = require('https'),
express = require('express'),
promisify = require('util').promisify,
app = express(),
axios = require('axios'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
nodemailer = require('nodemailer'),
randomstring = require('randomstring'),
expressSession = require('express-session'),
RedisStore = require('connect-redis')(expressSession),
redis = require('redis'),
knex = require('knex');

//modules
const
knexClient = require('./init/init-knex')(knex),
redisClient = require('./init/init-redis')(redis),
BcryptService = require('./services/auth/bcrypt'),
NodemailerService = require('./services/auth/mailVerify'),
AuthService = require('./services/auth/authService'),
ProfileService = require('./services/profile/profileService'),
UserProductService = require('./services/product/userProductService'),
MailNotifyService = require('./services/product/mailNotify'),
CommentService = require('./services/product/commentService'),
ProductService = require('./services/product/productService'),
ChatService = require('./services/chat/chatService'),
Bcrypt = new BcryptService(bcrypt, promisify),
Nodemailer = new NodemailerService(nodemailer),
profileService = new ProfileService(knexClient),
authService = new AuthService(axios, Bcrypt, jwt, promisify, redisClient, knexClient, Nodemailer, randomstring, profileService),
userProductService = new UserProductService(knexClient),
mailNotifyService = new MailNotifyService(nodemailer, knexClient),
commentService = new CommentService(knexClient),
productService = new ProductService(knexClient, userProductService, commentService, mailNotifyService),
chatService = new ChatService(knexClient),
router = require('./routers/router')(express, authService, profileService, productService, chatService, path)
require('./init/init-session')(app, redisClient, expressSession, RedisStore)
require('./init/init-app')(app, express, bodyParser, cors, router, path)

//server starts
if (process.env.NODE_ENV === 'development') {
  const
    fs = require('fs'),
    options = {
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.crt')),
      key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.key'))
    },
    server = https.createServer(options, app);
  server.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT} at ${new Date()}`));
} else {
  app.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT} at ${new Date()}`));
}