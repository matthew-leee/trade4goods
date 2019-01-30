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
authService = new AuthService(axios, Bcrypt, jwt, promisify, redisClient, knexClient, Nodemailer, randomstring),
profileService = new ProfileService(knexClient),
userProductService = new UserProductService(knexClient),
mailNotifyService = new MailNotifyService(nodemailer, knexClient),
commentService = new CommentService(knexClient),
productService = new ProductService(knexClient, userProductService, commentService, mailNotifyService),
chatService = new ChatService(knexClient),
router = require('./routers/router')(express, authService, profileService, productService, chatService, path)
require('./init/init-session')(app, redisClient, expressSession, RedisStore)
require('./init/init-app')(app, express, bodyParser, cors, router, path)

//server starts
server.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT} at ${new Date()}`));
